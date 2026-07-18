import mongoose from "mongoose";

const developmentTrackingSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    category: {
      type: String,
      enum: ["physical", "cognitive", "social", "language", "emotional"],
      required: true,
    },

    milestone: { type: String, required: true, trim: true },

    achievedDate: { type: Date, required: true, default: Date.now },

    ageAtAchievementMonths: Number,

    notes: { type: String, default: "" },


    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DevelopmentTracking", developmentTrackingSchema);
