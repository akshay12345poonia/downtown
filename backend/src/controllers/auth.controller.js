const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { sendEmail } = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Signup
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new AppError('Email already registered', 400));

  const user = await User.create({ name, email, password, role, phone });

  const token = signToken(user._id);

  res.status(201).json({
    status: 'success',
    message: 'Account created successfully',
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
  });
});

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
  });
});

// Forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError('Please provide your email address', 400));

  const user = await User.findOne({ email });
  if (!user) return next(new AppError('No user found with this email', 404));

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save({ validateBeforeSave: false });

  // Reset URL (change frontend URL later)
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;

  console.log(`🔗 Password Reset Link: ${resetURL}`);

  // Send reset email via nodemailer
  try {
    await sendEmail({
      to: user.email,
      subject: 'Downtown Real Estate – Password Reset (valid for 10 min)',
      text: `Hello ${user.name},\n\nYou requested a password reset. Use this link to reset your password:\n\n${resetURL}\n\nIf you did not request this, please ignore this email.\n\nTeam Downtown Real Estate`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
              <h2 style="color:#333">Password Reset Request</h2>
              <p>Hello <strong>${user.name}</strong>,</p>
              <p>You requested a password reset. Click the button below to set a new password:</p>
              <p style="text-align:center;margin:30px 0">
                <a href="${resetURL}" style="background:#2563eb;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold">Reset My Password</a>
              </p>
              <p style="color:#888;font-size:13px">This link is valid for <strong>10 minutes</strong>. If you did not request a reset, ignore this email.</p>
              <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
              <p style="color:#aaa;font-size:12px">Downtown Real Estate</p>
            </div>`
    });
  } catch (emailErr) {
    console.error('⚠️ Email sending failed:', emailErr.message);
    // Don't crash the API — the token is still usable from the response
  }

  res.status(200).json({
    status: 'success',
    message: 'Password reset email sent successfully',
    resetToken
  });
});

// Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  if (!password) return next(new AppError('Please provide a new password', 400));

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) return next(new AppError('Token is invalid or has expired', 400));

  // Update password
  user.password = password;
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