import Treatment from '../models/treatment.model.js';

const create = async (req, res) => {
  try {
    const t = new Treatment(req.body);
    const saved = await t.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const items = await Treatment.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const treatmentByID = async (req, res, next, id) => {
  try {
    const item = await Treatment.findById(id);
    if (!item) return res.status(404).json({ error: 'Treatment not found' });
    req.treatment = item;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve treatment' });
  }
};

const update = async (req, res) => {
  try {
    const t = req.treatment;
    Object.assign(t, req.body);
    t.updatedAt = new Date();
    const saved = await t.save();
    return res.json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const t = req.treatment;
    await t.remove();
    return res.json({ message: 'Treatment deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default { create, list, treatmentByID, update, remove };
