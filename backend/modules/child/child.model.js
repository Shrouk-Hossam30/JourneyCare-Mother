import mongoose from "mongoose";

const childSchema = new mongoose.Schema(
  {
    motherProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MotherProfile",
      required: true,
    },

    fatherUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    fullName: { type: String, required: true, trim: true },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    dateOfBirth: { type: Date, required: true },

    birthWeight: Number, // kg
    birthHeight: Number, // cm

    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    profilePhoto: String, // S3 URL

    healthNotes: { type: String, default: "" },

    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


childSchema.virtual("ageInMonths").get(function () {
  if (!this.dateOfBirth) return null;
  const diffMs = Date.now() - this.dateOfBirth.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
});


childSchema.virtual("ageStage").get(function () {
  const months = this.ageInMonths;
  if (months === null) return null;

  if (months < 1) return "Newborn";
  if (months < 12) return "Infant";
  if (months < 36) return "Toddler";
  if (months < 60) return "Pre-School";
  if (months < 144) return "School Age";
  return "Teen";
});

export default mongoose.model("Child", childSchema);
