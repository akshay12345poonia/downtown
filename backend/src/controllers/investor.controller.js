const Investor = require('../models/Investor.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { sendEmail } = require('../utils/email');

exports.createInvestor = catchAsync(async (req, res, next) => {
  const investor = await Investor.create(req.body);

  const adminEmail = process.env.INVESTOR_EMAIL || process.env.EMAIL_USER;
  if (adminEmail) {
    sendEmail({
      to: adminEmail,
      subject: `New investor enquiry from ${investor.name}`,
      text: `Name: ${investor.name}\nEmail: ${investor.email}\nPhone: ${investor.phone || 'N/A'}\nCompany: ${
        investor.company || 'N/A'
      }\nRange: ${investor.investmentRange || 'N/A'}\nInterests: ${investor.interests || 'N/A'}\n\nMessage:\n${
        investor.message || ''
      }`,
      html: `<p><strong>Name:</strong> ${investor.name}</p>
             <p><strong>Email:</strong> ${investor.email}</p>
             <p><strong>Phone:</strong> ${investor.phone || 'N/A'}</p>
             <p><strong>Company:</strong> ${investor.company || 'N/A'}</p>
             <p><strong>Investment range:</strong> ${investor.investmentRange || 'N/A'}</p>
             <p><strong>Interests:</strong> ${investor.interests || 'N/A'}</p>
             <p><strong>Message:</strong><br/>${investor.message || ''}</p>`
    }).catch(() => {});
  }

  res.status(201).json({
    status: 'success',
    message: 'Investor enquiry submitted successfully',
    data: { investor }
  });
});

exports.getInvestors = catchAsync(async (req, res, next) => {
  const investors = await Investor.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: investors.length,
    data: { investors }
  });
});

exports.getInvestor = catchAsync(async (req, res, next) => {
  const investor = await Investor.findById(req.params.id);

  if (!investor) return next(new AppError('No investor enquiry found with this id', 404));

  res.status(200).json({
    status: 'success',
    data: { investor }
  });
});

exports.deleteInvestor = catchAsync(async (req, res, next) => {
  const investor = await Investor.findByIdAndDelete(req.params.id);

  if (!investor) return next(new AppError('No investor enquiry found with this id', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

