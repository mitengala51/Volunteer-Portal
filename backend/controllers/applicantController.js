import { validationResult } from 'express-validator';
import Applicant from '../models/Applicant.js'
// @desc    Create new applicant
// @route   POST /api/applicants
// @access  Public
const createApplicant = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { fullName, email, phone, interests, availability, bio } = req.body;

    // Check if applicant already exists
    const existingApplicant = await Applicant.findOne({ email });
    if (existingApplicant) {
      return res.status(400).json({ 
        message: 'An application with this email already exists' 
      });
    }

    // Create applicant
    const applicant = await Applicant.create({
      fullName,
      email,
      phone,
      interests,
      availability,
      bio
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        id: applicant._id,
        fullName: applicant.fullName,
        email: applicant.email
      }
    });
  } catch (error) {
    console.error('Create applicant error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }

    res.status(500).json({ 
      message: 'Server error occurred while processing your application' 
    });
  }
};

// @desc    Get all applicants
// @route   GET /api/applicants
// @access  Private (Admin only)
const getApplicants = async (req, res) => {
  try {
    const { search, interest, reviewed } = req.query;
    let query = {};

    // Search by name or email
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by interest
    if (interest) {
      query.interests = { $in: [interest] };
    }

    // Filter by reviewed status
    if (reviewed !== undefined) {
      query.reviewed = reviewed === 'true';
    }

    const applicants = await Applicant.find(query)
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: applicants.length,
      data: applicants
    });
  } catch (error) {
    console.error('Get applicants error:', error);
    res.status(500).json({ 
      message: 'Server error occurred while fetching applicants' 
    });
  }
};

// @desc    Toggle applicant reviewed status
// @route   PUT /api/applicants/:id/review
// @access  Private (Admin only)
const toggleReviewStatus = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);

    if (!applicant) {
      return res.status(404).json({ 
        message: 'Applicant not found' 
      });
    }

    applicant.reviewed = !applicant.reviewed;
    await applicant.save();

    res.json({
      success: true,
      message: `Applicant marked as ${applicant.reviewed ? 'reviewed' : 'unreviewed'}`,
      data: {
        id: applicant._id,
        reviewed: applicant.reviewed
      }
    });
  } catch (error) {
    console.error('Toggle review status error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid applicant ID' 
      });
    }

    res.status(500).json({ 
      message: 'Server error occurred while updating review status' 
    });
  }
};

// @desc    Get single applicant
// @route   GET /api/applicants/:id
// @access  Private (Admin only)
const getApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id).select('-__v');

    if (!applicant) {
      return res.status(404).json({ 
        message: 'Applicant not found' 
      });
    }

    res.json({
      success: true,
      data: applicant
    });
  } catch (error) {
    console.error('Get applicant error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid applicant ID' 
      });
    }

    res.status(500).json({ 
      message: 'Server error occurred while fetching applicant' 
    });
  }
};

export { createApplicant, getApplicants, toggleReviewStatus, getApplicant };
