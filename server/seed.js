import mongoose from 'mongoose';
import config from '../config/config.js';
import User from './models/user.model.js';
import Patient from './models/patient.model.js';
import Treatment from './models/treatment.model.js';
import Appointment from './models/appointment.model.js';

async function connect() {
  mongoose.Promise = global.Promise;
  await mongoose.connect(config.mongoUri, {});
}

async function seed() {
  try {
    await connect();
    console.log('Connected to MongoDB for seeding');

    // Create dentist user
    let dentist = await User.findOne({ username: 'alice' });
    if (!dentist) {
      dentist = new User({ username: 'alice', name: 'Alice Dent', email: 'alice@test.com', role: 'dentist' });
      dentist.password = 'Password1';
      await dentist.save();
      console.log('Created dentist user:', dentist._id.toString());
    } else {
      console.log('Dentist user already exists:', dentist._id.toString());
    }

    // Create patient
    let patient = await Patient.findOne({ firstName: 'John', lastName: 'Doe' });
    if (!patient) {
      patient = new Patient({ firstName: 'John', lastName: 'Doe', dob: new Date('1990-01-01'), phone: '1234567890', medicalHistory: 'None' });
      await patient.save();
      console.log('Created patient:', patient._id.toString());
    } else {
      console.log('Patient already exists:', patient._id.toString());
    }

    // Create treatment
    let treatment = await Treatment.findOne({ code: 'T100' });
    if (!treatment) {
      treatment = new Treatment({ code: 'T100', name: 'Cleaning', description: 'Teeth cleaning', price: 80, durationMins: 30 });
      await treatment.save();
      console.log('Created treatment:', treatment._id.toString());
    } else {
      console.log('Treatment already exists:', treatment._id.toString());
    }

    // Create appointment
    let appointment = await Appointment.findOne({ patient: patient._id, dentist: dentist._id, startAt: new Date('2025-11-25T10:00:00.000Z') });
    if (!appointment) {
      appointment = new Appointment({ patient: patient._id, dentist: dentist._id, treatments: [treatment._id], startAt: new Date('2025-11-25T10:00:00.000Z') });
      await appointment.save();
      console.log('Created appointment:', appointment._id.toString());
    } else {
      console.log('Appointment already exists:', appointment._id.toString());
    }

    console.log('Seeding complete.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
