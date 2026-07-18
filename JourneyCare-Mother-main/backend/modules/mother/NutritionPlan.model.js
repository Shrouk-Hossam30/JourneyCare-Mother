import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    calories: Number,
    tags: [{ type: String, trim: true }], 
  },
  { _id: true }
);

const nutritionPlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    trimester: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },

    description: { type: String, trim: true },

    meals: [mealSchema],

    tags: [{ type: String, trim: true }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("NutritionPlan", nutritionPlanSchema);
