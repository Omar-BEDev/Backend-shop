import { Router } from 'express';
import { login, signup, bannedUser, changeRole } from '../controllers/users.controller';
import { authToken } from '../middlewares/auth.middeleware';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.put('/banned', authToken, bannedUser);
router.put('/change-role', authToken, changeRole);

export default router;