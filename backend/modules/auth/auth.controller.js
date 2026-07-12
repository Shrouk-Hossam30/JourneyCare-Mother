const User = require('./user.model');
const { hashPassword, comparePassword } = require('../../utils/bcrypt');
const { generateToken } = require('../../utils/jwt');

// ================= Register =================
const register = async (req, res) => {
  const { fullName, email, password, phone, role } = req.body;

  // Check Email Exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists',
    });
  }

  // Hash Password
  const hashedPassword = await hashPassword(password);
<<<<<<< Updated upstream
  const status = role === 'doctor' ? 'pending' : 'active';
=======

  const status = role === 'doctor' ? 'pending' : 'active';

  if (role === 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin account cannot be created from registration.',
    });
  }
>>>>>>> Stashed changes
  // Create User
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    phone,
    role,
<<<<<<< Updated upstream
=======
    status,
>>>>>>> Stashed changes
  });

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
};

// ================= Login =================
const login = async (req, res) => {
  const { email, password } = req.body;

  // Find User
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Check Password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Check Status
  if (user.status !== 'active') {
    return res.status(403).json({
      success: false,
      message: 'Your account is not active yet',
    });
  }

<<<<<<< Updated upstream
  // Generate Token
=======
>>>>>>> Stashed changes
  const token = generateToken({
    id: user._id,
    role: user.role,
  });

<<<<<<< Updated upstream
=======
  // =================  Stream Chat & Video Call  =================
  let streamToken = '';
  try {
    const serverClient = StreamChat.getInstance(
      process.env.STREAM_API_KEY,
      process.env.STREAM_API_SECRET,
    );

    const userId = user._id.toString();

    await serverClient.upsertUser({
      id: userId,
      name: user.fullName,
      role: user.role === 'admin' ? 'admin' : 'user',
      image: user.profileImage || '',
    });

    streamToken = serverClient.createToken(userId);
  } catch (streamError) {
    console.error('Stream Error:', streamError.message);
  }

>>>>>>> Stashed changes
  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
<<<<<<< Updated upstream
=======
    streamToken,
>>>>>>> Stashed changes
    data: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    },
  });
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  register,
  login,
  getMe,
};
