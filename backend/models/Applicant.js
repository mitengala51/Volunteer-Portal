import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  interests: {
    type: [String],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one interest must be selected'
    }
  },
  availability: {
    type: String,
    required: [true, 'Availability is required'],
    enum: ['Full-time', 'Part-time', 'Weekends']
  },
  bio: {
    type: String,
    maxlength: [300, 'Bio cannot exceed 300 characters'],
    trim: true
  },
  reviewed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Applicant = mongoose.model('Applicant', applicantSchema);
export default Applicant