import { Router } from 'express';
import ProductTypeController from '../controller/type.controller';

const router = Router();

router.post('/create', (req, res) => {
  ProductTypeController.creatType(req, res);
});

router.post('/update', (req, res) => {
  ProductTypeController.updateType(req, res);
});

export default router;
