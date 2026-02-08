import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  dentist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  treatments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Treatment' }],
  startAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Appointment', AppointmentSchema);
