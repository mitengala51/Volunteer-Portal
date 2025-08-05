import { Router } from 'express';
import { body } from 'express-validator';
import { loginAdmin, registerAdmin, getAdminProfile } from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Validation rules for admin login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for admin registration
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// @route   POST /api/admin/login
// @desc    Authenticate admin and get token
// @access  Public
router.post('/login', loginValidation, loginAdmin);

// @route   POST /api/admin/register
// @desc    Register admin (for initial setup - remove in production)
// @access  Public
router.post('/register', registerValidation, registerAdmin);

// @route   GET /api/admin/profile
// @desc    Get admin profile
// @access  Private
router.get('/profile', protect, getAdminProfile);

export default router;