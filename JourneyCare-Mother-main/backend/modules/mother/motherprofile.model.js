import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    relation: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const motherProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: { type: String, required: true, trim: true },

    dateOfBirth: { type: Date, required: true },

    nationalId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    phone: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    address: {
      city: { type: String, trim: true },
      governorate: { type: String, trim: true },
      street: { type: String, trim: true },
    },

    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    height: Number, 
    prePregnancyWeight: Number, 

    occupation: { type: String, trim: true },
    profilePhoto: String, 

    healthNotes: { type: String, default: "" },

    emergencyContact: emergencyContactSchema,

    
    activePregnancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PregnancyTracking",
      default: null,
    },

    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


motherProfileSchema.virtual("children", {
  ref: "Child",
  localField: "_id",
  foreignField: "motherProfile",
});

export default mongoose.model("MotherProfile", motherProfileSchema);
