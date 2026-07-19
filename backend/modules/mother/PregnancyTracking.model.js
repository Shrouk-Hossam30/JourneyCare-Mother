import mongoose from "mongoose";

const vitalsEntrySchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    weight: Number, 
    bloodPressure: {
      systolic: Number,
      diastolic: Number,
    },
    bloodSugar: Number, 
    fetalHeartRate: Number, 
    notes: { type: String, default: "" },
  },
  { _id: true }
);

const symptomEntrySchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    symptom: { type: String, required: true, trim: true },
    severity: {
      type: String,
      enum: ["mild", "moderate", "severe"],
      default: "mild",
    },
    notes: { type: String, default: "" },
  },
  { _id: true }
);

const appointmentSchema = new mongoose.Schema(
  {
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    date: { type: Date, required: true },
    reason: { type: String, trim: true },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    notes: { type: String, default: "" },
  },
  { _id: true }
);

const moodLogSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    mood: {
      type: String,
      enum: ["very_bad", "bad", "neutral", "good", "very_good"],
      required: true,
    },
    notes: { type: String, default: "" },
  },
  { _id: true }
);

const pregnancyTrackingSchema = new mongoose.Schema(
  {
    motherProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MotherProfile",
      required: true,
    },

    pregnancyNumber: { type: Number, default: 1 }, 

    lastMenstrualPeriod: { type: Date, required: true }, 
    dueDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["ongoing", "completed", "miscarried", "terminated"],
      default: "ongoing",
    },

    vitals: [vitalsEntrySchema],
    symptoms: [symptomEntrySchema],
    appointments: [appointmentSchema],

    psychologicalReadiness: {
      stressLevel: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
      },
      moodLog: [moodLogSchema],
      notes: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

pregnancyTrackingSchema.virtual("currentWeek").get(function () {
  if (!this.lastMenstrualPeriod) return null;
  const diffMs = Date.now() - this.lastMenstrualPeriod.getTime();
  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
  return Math.max(0, Math.min(diffWeeks, 42));
});

pregnancyTrackingSchema.virtual("trimester").get(function () {
  const week = this.currentWeek;
  if (week === null) return null;
  if (week <= 13) return 1;
  if (week <= 27) return 2;
  return 3;
});

export default mongoose.model("PregnancyTracking", pregnancyTrackingSchema);
