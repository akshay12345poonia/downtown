const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');           // ← New
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role, phone } = req.body;

  // #region agent log
  fetch('http://127.0.0.1:7703/ingest/2a871325-0a09-47bd-89e5-21453baa7783', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '2c712a'
    },
    body: JSON.stringify({
      sessionId: '2c712a',
      runId: 'initial',
      hypothesisId: 'H1_H3_H4',
      location: 'auth.controller.js:signup:entry',
      message: 'Signup called',
      data: {
        hasBody: !!req.body,
        hasEmail: !!email,
        hasPassword: !!password,
        role: role || null
      },
      timestamp: Date.now()
    })
  }).catch(() => {});
  // #endregion

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new AppError('Email already registered', 400));

  const user = await User.create({ name, email, password, role, phone });

  // #region agent log
  fetch('http://127.0.0.1:7703/ingest/2a871325-0a09-47bd-89e5-21453baa7783', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '2c712a'
    },
    body: JSON.stringify({
      sessionId: '2c712a',
      runId: 'initial',
      hypothesisId: 'H1',
      location: 'auth.controller.js:signup:postCreate',
      message: 'User created in signup',
      data: {
        userId: String(user._id),
        email: user.email
      },
      timestamp: Date.now()
    })
  }).catch(() => {});
  // #endregion

  const token = signToken(user._id);

  res.status(201).json({
    status: 'success',
    message: 'Account created successfully',
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // #region agent log
  fetch('http://127.0.0.1:7703/ingest/2a871325-0a09-47bd-89e5-21453baa7783', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '2c712a'
    },
    body: JSON.stringify({
      sessionId: '2c712a',
      runId: 'initial',
      hypothesisId: 'H2_H3',
      location: 'auth.controller.js:login:entry',
      message: 'Login called',
      data: {
        hasBody: !!req.body,
        hasEmail: !!email,
        hasPassword: !!password
      },
      timestamp: Date.now()
    })
  }).catch(() => {});
  // #endregion

  if (!email || !password) return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  // #region agent log
  fetch('http://127.0.0.1:7703/ingest/2a871325-0a09-47bd-89e5-21453baa7783', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '2c712a'
    },
    body: JSON.stringify({
      sessionId: '2c712a',
      runId: 'initial',
      hypothesisId: 'H2',
      location: 'auth.controller.js:login:postFindUser',
      message: 'User lookup in login',
      data: {
        foundUser: !!user,
        emailSearched: email
      },
      timestamp: Date.now()
    })
  }).catch(() => {});
  // #endregion
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

// 🔥 New: Forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('No user found with this email', 404));

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save({ validateBeforeSave: false });

  // Reset URL (change frontend URL later)
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;

  console.log(`🔗 Password Reset Link (copy-paste in browser): ${resetURL}`);

  res.status(200).json({
    status: 'success',
    message: 'Password reset link has been sent (check console for testing)'
  });
});

// 🔥 New: Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) return next(new AppError('Token is invalid or has expired', 400));

  // Update password
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