import { Router } from 'express';
import {
  loginController,
  registerController,
  updateUserController,
} from '../controller/user.controller';

const router = Router();

router.post('/login', (req, res) => {
  loginController(req, res);
});
router.post('/register', (req, res) => {
  registerController(req, res);
});
router.post('/update-user', (req, res) => {
  updateUserController(req, res);
});

export default router;
