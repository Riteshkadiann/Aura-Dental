import express from 'express';
import appointmentCtrl from '../controllers/appointment.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/api/appointments').post(authCtrl.requireSignin, appointmentCtrl.create);
router.route('/api/appointments').get(authCtrl.requireSignin, appointmentCtrl.list);
router.param('appointmentId', appointmentCtrl.appointmentByID);
router.route('/api/appointments/:appointmentId').get(authCtrl.requireSignin, appointmentCtrl.read);
router.route('/api/appointments/:appointmentId').put(authCtrl.requireSignin, appointmentCtrl.update);
router.route('/api/appointments/:appointmentId').delete(authCtrl.requireSignin, appointmentCtrl.remove);

export default router;
