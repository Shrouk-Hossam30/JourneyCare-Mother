const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    role: { type: String, enum: ['mother', 'doctor', 'admin'], required: true },
    status: {
      type: String,
      enum: ['active', 'pending', 'blocked'],
      default: function () {
        return this.role === 'doctor' ? 'pending' : 'active';
      },
    },
    profileImage: { type: String, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
