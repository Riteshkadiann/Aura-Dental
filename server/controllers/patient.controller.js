import Patient from '../models/patient.model.js';

const create = async (req, res) => {
  try {
    const p = new Patient(req.body);
    const saved = await p.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    return res.json(patients);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const read = async (req, res) => {
  return res.json(req.patient);
};

const patientByID = async (req, res, next, id) => {
  try {
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    req.patient = patient;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve patient' });
  }
};

const update = async (req, res) => {
  try {
    const p = req.patient;
    Object.assign(p, req.body);
    p.updatedAt = new Date();
    const saved = await p.save();
    return res.json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const p = req.patient;
    await p.remove();
    return res.json({ message: 'Patient deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default { create, list, read, patientByID, update, remove };
