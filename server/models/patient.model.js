import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date },
  phone: { type: String },
  medicalHistory: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Patient', PatientSchema);
