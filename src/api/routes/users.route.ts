import { Router } from 'express';
import { login, signup, bannedUser, changeRole } from '../controllers/users.controller';
import { authToken } from '../middlewares/auth.middeleware';
import { isHaveAccess, isSuperAdmin, validateUserReqBody } from '../middlewares/users.middleware';
import { loginSignupRateLimiter } from '../middlewares/rateLimiter.middleware';

const router = Router();

router.post('/login', loginSignupRateLimiter, login);
router.post('/signup', loginSignupRateLimiter, validateUserReqBody, signup);
router.put('/banned', authToken, isHaveAccess,bannedUser);
router.put('/change-role', authToken, isSuperAdmin,changeRole);

export default router;