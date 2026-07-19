import mongoose from "mongoose";

const sleepTrackingSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    type: {
      type: String,
      enum: ["nap", "night"],
      required: true,
    },

    sleepStart: { type: Date, required: true },
    sleepEnd: { type: Date, required: true },

    quality: {
      type: String,
      enum: ["poor", "fair", "good", "excellent"],
      default: "good",
    },

    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


sleepTrackingSchema.virtual("durationMinutes").get(function () {
  if (!this.sleepStart || !this.sleepEnd) return null;
  return Math.round((this.sleepEnd - this.sleepStart) / (1000 * 60));
});

sleepTrackingSchema.pre("validate", function (next) {
  if (this.sleepEnd && this.sleepStart && this.sleepEnd <= this.sleepStart) {
    return next(new Error("sleepEnd must be after sleepStart"));
  }
  next();
});

export default mongoose.model("SleepTracking", sleepTrackingSchema);
