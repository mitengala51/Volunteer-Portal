import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';
import Admin from '../models/Admin.js'

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// @desc    Authenticate admin and get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          id: admin._id,
          email: admin.email,
          token: generateToken(admin._id)
        }
      });
    } else {
      res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      message: 'Server error occurred during login' 
    });
  }
};

// @desc    Register admin (for initial setup)
// @route   POST /api/admin/register
// @access  Public (should be removed in production)
const registerAdmin = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ 
        message: 'Admin with this email already exists' 
      });
    }

    // Create admin
    const admin = await Admin.create({
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        id: admin._id,
        email: admin.email,
        token: generateToken(admin._id)
      }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    
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
      message: 'Server error occurred during registration' 
    });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    
    res.json({
      success: true,
      data: admin
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({ 
      message: 'Server error occurred while fetching profile' 
    });
  }
};

export { loginAdmin, registerAdmin, getAdminProfile };
