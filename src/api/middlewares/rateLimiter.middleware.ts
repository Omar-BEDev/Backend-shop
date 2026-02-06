import rateLimit from 'express-rate-limit';

export const loginSignupRateLimiter = rateLimit({
    windowMs: Number(process.env.LOGIN_SIGNUP_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: Number(process.env.LOGIN_SIGNUP_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

export const uploadRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: Number(process.env.UPLOAD_MAX_REQUESTS) || 5, // limit each IP to 5 requests per windowMs
    message: 'Too many uploads from this IP, please try again after an hour'
});
