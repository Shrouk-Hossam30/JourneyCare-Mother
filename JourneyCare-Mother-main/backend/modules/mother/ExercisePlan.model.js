import mongoose from "mongoose";

const exerciseItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    durationMinutes: Number,
    videoUrl: String, 
    tags: [{ type: String, trim: true }], 
  },
  { _id: true }
);

const exercisePlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    trimester: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },

    description: { type: String, trim: true },

    exercises: [exerciseItemSchema],

    tags: [{ type: String, trim: true }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin
      required: true,
    },

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("ExercisePlan", exercisePlanSchema);
