import express from 'express';
import treatmentCtrl from '../controllers/treatment.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/api/treatments').post(authCtrl.requireSignin, treatmentCtrl.create);
router.route('/api/treatments').get(authCtrl.requireSignin, treatmentCtrl.list);
router.param('treatmentId', treatmentCtrl.treatmentByID);
router.route('/api/treatments/:treatmentId').put(authCtrl.requireSignin, treatmentCtrl.update);
router.route('/api/treatments/:treatmentId').delete(authCtrl.requireSignin, treatmentCtrl.remove);

export default router;
