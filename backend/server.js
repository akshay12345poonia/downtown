const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

dotenv.config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    const B = `http://localhost:${PORT}/api/v1`;

    console.log(`\n🚀 Server running on port ${PORT}\n`);

    // ─── Auth (Public) ───
    console.log('═══════════════════════════════════════════');
    console.log('🔓  AUTH (Public – no login required)');
    console.log('═══════════════════════════════════════════');
    console.log(`  POST   ${B}/auth/signup`);
    console.log(`  POST   ${B}/auth/login`);
    console.log(`  POST   ${B}/auth/forgotPassword`);
    console.log(`  PATCH  ${B}/auth/resetPassword/:token`);

    // ─── Public APIs ───
    console.log('\n═══════════════════════════════════════════');
    console.log('🌐  PUBLIC APIs (no login required)');
    console.log('═══════════════════════════════════════════');
    console.log(`  GET    ${B}/properties`);
    console.log(`  GET    ${B}/properties/:id`);
    console.log(`  GET    ${B}/testimonials`);
    console.log(`  GET    ${B}/agents`);
    console.log(`  GET    ${B}/agents/:id`);
    console.log(`  GET    ${B}/careers`);
    console.log(`  GET    ${B}/careers/:id`);
    console.log(`  GET    ${B}/team`);
    console.log(`  GET    ${B}/team/:id`);
    console.log(`  GET    ${B}/contacts`);
    console.log(`  GET    ${B}/contacts/:id`);
    console.log(`  GET    ${B}/investors`);
    console.log(`  GET    ${B}/investors/:id`);

    // ─── Buyer APIs ───
    console.log('\n═══════════════════════════════════════════');
    console.log('🛒  BUYER APIs');
    console.log('═══════════════════════════════════════════');
    console.log(`  POST   ${B}/buying              (submit buying inquiry)`);
    console.log(`  GET    ${B}/buying              (list buying inquiries)`);
    console.log(`  GET    ${B}/buying/:id          (get single inquiry)`);
    console.log(`  DELETE ${B}/buying/:id          (delete inquiry)`);
    console.log(`  POST   ${B}/meetings            (book a meeting)`);
    console.log(`  POST   ${B}/contacts            (submit contact form)`);
    console.log(`  POST   ${B}/testimonials        (submit testimonial)`);
    console.log(`  POST   ${B}/investors           (submit investor inquiry)`);

    // ─── Seller APIs ───
    console.log('\n═══════════════════════════════════════════');
    console.log('🏠  SELLER APIs (login required – role: seller)');
    console.log('═══════════════════════════════════════════');
    console.log(`  POST   ${B}/properties          (create property)`);
    console.log(`  PATCH  ${B}/properties/:id      (update property)`);
    console.log(`  DELETE ${B}/properties/:id      (delete property)`);
    console.log(`  POST   ${B}/selling             (submit selling inquiry)`);
    console.log(`  GET    ${B}/selling             (list selling inquiries)`);
    console.log(`  GET    ${B}/selling/:id         (get single inquiry)`);
    console.log(`  DELETE ${B}/selling/:id         (delete inquiry)`);
    console.log(`  GET    ${B}/meetings            (view meetings)`);
    console.log(`  GET    ${B}/meetings/:id        (view single meeting)`);
    console.log(`  PATCH  ${B}/meetings/:id        (update meeting)`);
    console.log(`  DELETE ${B}/meetings/:id        (delete meeting)`);

    // ─── Admin APIs ───
    console.log('\n═══════════════════════════════════════════');
    console.log('👑  ADMIN APIs (login required – role: admin)');
    console.log('═══════════════════════════════════════════');
    console.log(`  POST   ${B}/properties          (create property)`);
    console.log(`  PATCH  ${B}/properties/:id      (update property)`);
    console.log(`  DELETE ${B}/properties/:id      (delete property)`);
    console.log(`  POST   ${B}/agents              (create agent)`);
    console.log(`  PATCH  ${B}/agents/:id          (update agent)`);
    console.log(`  DELETE ${B}/agents/:id          (delete agent)`);
    console.log(`  POST   ${B}/careers             (create career)`);
    console.log(`  PATCH  ${B}/careers/:id         (update career)`);
    console.log(`  DELETE ${B}/careers/:id         (delete career)`);
    console.log(`  POST   ${B}/team                (add team member)`);
    console.log(`  PATCH  ${B}/team/:id            (update team member)`);
    console.log(`  DELETE ${B}/team/:id            (delete team member)`);
    console.log(`  GET    ${B}/meetings            (view all meetings)`);
    console.log(`  GET    ${B}/meetings/:id        (view single meeting)`);
    console.log(`  PATCH  ${B}/meetings/:id        (update meeting)`);
    console.log(`  DELETE ${B}/meetings/:id        (delete meeting)`);
    console.log(`  DELETE ${B}/testimonials/:id    (delete testimonial)`);
    console.log(`  DELETE ${B}/contacts/:id        (delete contact)`);
    console.log(`  DELETE ${B}/investors/:id       (delete investor)`);
    console.log(`  DELETE ${B}/buying/:id          (delete buying inquiry)`);
    console.log(`  DELETE ${B}/selling/:id         (delete selling inquiry)`);

    console.log('\n═══════════════════════════════════════════\n');
  });
});

