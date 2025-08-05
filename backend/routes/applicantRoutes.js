import express from 'express'
import { body } from 'express-validator'
import { createApplicant, getApplicants, toggleReviewStatus, getApplicant } from '../controllers/applicantController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router();

// Validation rules for applicant creation
const applicantValidation = [
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('phone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters')
    .trim(),
  body('interests')
    .isArray({ min: 1 })
    .withMessage('At least one interest must be selected'),
  body('interests.*')
    .isIn(['Education', 'Tech', 'Outreach', 'Healthcare', 'Environment', 'Community Service'])
    .withMessage('Invalid interest selected'),
  body('availability')
    .isIn(['Full-time', 'Part-time', 'Weekends'])
    .withMessage('Please select a valid availability option'),
  body('bio')
    .optional()
    .isLength({ max: 300 })
    .withMessage('Bio cannot exceed 300 characters')
    .trim()
];

// @route   POST /api/applicants
// @desc    Create new applicant
// @access  Public
router.post('/', applicantValidation, createApplicant);

// @route   GET /api/applicants
// @desc    Get all applicants (with optional filtering)
// @access  Private
router.get('/', protect, getApplicants);

// @route   GET /api/applicants/:id
// @desc    Get single applicant
// @access  Private
router.get('/:id', protect, getApplicant);

// @route   PUT /api/applicants/:id/review
// @desc    Toggle applicant reviewed status
// @access  Private
router.put('/:id/review', protect, toggleReviewStatus);

export default router