const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

/* ==============================
   TOKEN SIGN
============================== */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

/* ==============================
   EMAIL TRANSPORTER
============================== */
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"SilverBrick" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

/* ==============================
   SIGNUP
============================== */
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return next(new AppError('Email already registered', 400));

  const user = await User.create({
    name,
    email,
    password,
    role,
    phone
  });

  const token = signToken(user._id);

  /* ===== Welcome Email ===== */
  await sendEmail({
    email: user.email,
    subject: 'Welcome to SilverBrick 🏡',
    html: `
      <h2>Welcome to SilverBrick, ${user.name} 👋</h2>
      <p>We’re excited to have you on board!</p>
      <p>SilverBrick helps you find premium properties with trust and transparency.</p>
      <br/>
      <p><b>Your Account Details:</b></p>
      <p>Email: ${user.email}</p>
      <br/>
      <p>If you did not create this account, please contact support immediately.</p>
      <br/>
      <p>Regards,<br/>SilverBrick Team</p>
    `
  });

  res.status(201).json({
    status: 'success',
    message: 'Account created successfully',
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    }
  });
});

/* ==============================
   LOGIN
============================== */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    }
  });
});

/* ==============================
   FORGOT PASSWORD
============================== */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return next(new AppError('No user found with this email', 404));

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

  await user.save({ validateBeforeSave: false });
  const resetURL = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

  /* ===== Forgot Password Email ===== */
  await sendEmail({
    email: user.email,
    subject: 'SilverBrick Password Reset 🔐',
    html: `
      <h2>Password Reset Request</h2>
      <p>Hello ${user.name},</p>
      <p>We received a request to reset your SilverBrick account password.</p>
      <br/>
      <p>Click the link below to reset your password:</p>
      <a href="${resetURL}" style="background:#111;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">
        Reset Password
      </a>
      <br/><br/>
      <p>This link will expire in 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
      <br/>
      <p>Regards,<br/>SilverBrick Team</p>
    `
  });

  res.status(200).json({
    status: 'success',
    message: 'Password reset link sent to email'
  });
});

/* ==============================
   RESET PASSWORD
============================== */
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user)
    return next(new AppError('Token is invalid or expired', 400));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    message: 'Password reset successful',
    token
  });
});

/* ==============================
   GET ME (Profile)
============================== */
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar
      }
    }
  });
});

/* ==============================
   UPDATE ME (Profile)
============================== */
exports.updateMe = catchAsync(async (req, res, next) => {
  // Prevent password updates via this route
  if (req.body.password) {
    return next(new AppError('This route is not for password updates.', 400));
  }

  const updateFields = {};
  if (req.body.name) updateFields.name = req.body.name;
  if (req.body.phone) updateFields.phone = req.body.phone;
  if (req.file) {
    updateFields.avatar = `/uploads/${req.file.filename}`;
  } else if (req.body.removeAvatar === 'true' || req.body.removeAvatar === true) {
    updateFields.avatar = null;
  }

  const user = await User.findByIdAndUpdate(req.user._id, updateFields, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar
      }
    }
  });
});
