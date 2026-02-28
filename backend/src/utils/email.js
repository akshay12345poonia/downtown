const nodemailer = require('nodemailer');

let cachedTransporter = null;

/**
 * Create a transporter.
 * - In development (no EMAIL_HOST set), auto-creates an Ethereal test account
 *   so emails work out-of-the-box without any config.
 * - In production, uses the EMAIL_* env vars.
 */
const getTransporter = async () => {
  if (cachedTransporter) return cachedTransporter;

  if (process.env.EMAIL_HOST) {
    // Production / custom SMTP
    cachedTransporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Development – use free Ethereal test account
    const testAccount = await nodemailer.createTestAccount();
    cachedTransporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    console.log('📧 Ethereal test email account created:');
    console.log(`   User: ${testAccount.user}`);
    console.log(`   Pass: ${testAccount.pass}`);
    console.log('   View sent emails at: https://ethereal.email/login');
  }

  return cachedTransporter;
};

/**
 * Send an email. Returns info object with messageId and preview URL (dev).
 */
exports.sendEmail = async ({ to, subject, text, html }) => {
  const transporter = await getTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'Downtown Real Estate <noreply@downtown.com>',
    to,
    subject,
    text,
    html
  };

  const info = await transporter.sendMail(mailOptions);

  // In dev (Ethereal), log the preview URL so you can view the email in browser
  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log(`📬 Email preview: ${previewUrl}`);
  }

  return info;
};
