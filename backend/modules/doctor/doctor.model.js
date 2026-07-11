const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    medicalLicense: {
        number: { type: String, required: true },
        expiryDate: { type: Date, required: true },
    },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    about: { type: String },
    location: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: String,
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    isActive: { type: Boolean, default: false },
    consultationFees: {
        visit: Number,
        chat: Number,
        video: Number
    },

}, { timestamps: true });


module.exports = mongoose.model("Doctor", doctorSchema);
