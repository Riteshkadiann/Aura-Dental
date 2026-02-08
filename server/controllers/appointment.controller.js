import Appointment from '../models/appointment.model.js';

const create = async (req, res) => {
  try {
    const a = new Appointment(req.body);
    const saved = await a.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const items = await Appointment.find().populate('patient dentist treatments').sort({ startAt: 1 });
    return res.json(items);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const appointmentByID = async (req, res, next, id) => {
  try {
    const item = await Appointment.findById(id).populate('patient dentist treatments');
    if (!item) return res.status(404).json({ error: 'Appointment not found' });
    req.appointment = item;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve appointment' });
  }
};

const read = (req, res) => res.json(req.appointment);

const update = async (req, res) => {
  try {
    const a = req.appointment;
    Object.assign(a, req.body);
    a.updatedAt = new Date();
    const saved = await a.save();
    return res.json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const a = req.appointment;
    await a.remove();
    return res.json({ message: 'Appointment deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default { create, list, appointmentByID, read, update, remove };
