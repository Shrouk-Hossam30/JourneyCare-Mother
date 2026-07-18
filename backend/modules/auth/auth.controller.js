const User = require('./user.model');
const { hashPassword, comparePassword } = require('../../utils/bcrypt');
const { generateToken } = require('../../utils/jwt');
const { StreamChat } = require('stream-chat');

const register = async (req, res) => {
  const { fullName, email, password, phone, role } = req.body;

  if (role === 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin account cannot be created from registration.',
    });
  }

  if (role === 'doctor' && !req.file) {
    return res.status(400).json({ success: false, message: 'Credential file is required for doctors' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'Email already exists' });
  }

  const hashedPassword = await hashPassword(password);
  const status = role === 'doctor' ? 'pending' : 'active';
  const credential = req.file ? req.file.path : null;

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    phone,
    role,
    status,
    credential,
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

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  if (user.status !== 'active') {
    return res.status(403).json({ success: false, message: 'Your account is not active yet' });
  }

  const token = generateToken({ id: user._id, role: user.role });

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

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    streamToken,
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
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, data: user });
};

module.exports = { register, login, getMe };
