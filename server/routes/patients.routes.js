import express from 'express';
import patientCtrl from '../controllers/patient.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/api/patients').post(authCtrl.requireSignin, patientCtrl.create);
router.route('/api/patients').get(authCtrl.requireSignin, patientCtrl.list);
router.param('patientId', patientCtrl.patientByID);
router.route('/api/patients/:patientId').get(authCtrl.requireSignin, patientCtrl.read);
router.route('/api/patients/:patientId').put(authCtrl.requireSignin, patientCtrl.update);
router.route('/api/patients/:patientId').delete(authCtrl.requireSignin, patientCtrl.remove);

export default router;
