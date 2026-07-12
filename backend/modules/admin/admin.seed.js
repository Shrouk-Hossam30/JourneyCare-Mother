const User = require('../auth/user.model');
const { hashPassword } = require('../../utils/bcrypt');

const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (adminExists) {
      console.log('✅ Admin already exists');
      return;
    }

    const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD);

    await User.create({
      fullName: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      phone: process.env.ADMIN_PHONE,
      role: 'admin',
      status: 'active',
    });

    console.log('✅ Admin created successfully');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = createAdmin;
