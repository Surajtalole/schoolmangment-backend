// models/adminModel.js
const mongoose = require('mongoose');

// Define the Admin Schema
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    plan:{
        type:String,
        require:true,
        default:""
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          // Regular expression to check if the email format is valid
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v);
        },
        message: 'Please enter a valid email address.',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password should be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'], // You can extend roles as needed
      default: 'admin',
    },
    schoolName: {
      type: String,
      required: true,
      trim: true,
    },
    schoolUid: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model using the schema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
