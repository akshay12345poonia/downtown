const Contact = require('../models/Contact.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { sendEmail } = require('../utils/email');

// Submit contact form
exports.createContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  // Fire-and-forget email to site admin (do not block response if fails)
  const adminEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_USER;
  if (adminEmail) {
    sendEmail({
      to: adminEmail,
      subject: `New contact message from ${contact.name}`,
      text: `Name: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone || 'N/A'}\nSubject: ${
        contact.subject || 'N/A'
      }\n\nMessage:\n${contact.message}`,
      html: `<p><strong>Name:</strong> ${contact.name}</p>
             <p><strong>Email:</strong> ${contact.email}</p>
             <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
             <p><strong>Subject:</strong> ${contact.subject || 'N/A'}</p>
             <p><strong>Message:</strong><br/>${contact.message}</p>`
    }).catch(() => {});
  }

  res.status(201).json({
    status: 'success',
    message: 'Contact message submitted successfully',
    data: { contact }
  });
});

// List all contact messages
exports.getContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: contacts.length,
    data: { contacts }
  });
});

// Get single contact message
exports.getContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) return next(new AppError('No contact message found with this id', 404));

  res.status(200).json({
    status: 'success',
    data: { contact }
  });
});

// Delete contact message
exports.deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) return next(new AppError('No contact message found with this id', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

