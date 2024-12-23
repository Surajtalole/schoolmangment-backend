const Admin = require('../models/admin'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, schoolName, schoolUid } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      schoolName,
      schoolUid,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    console.log("Admin:", admin)
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'shdjdcnjs3453';

    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token, message: 'Login successful.' });
    
    // Store the token in localStorage on the frontend
    // localStorage.setItem('token', token); // Save the token to localStorage (frontend)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


//update plan
const updatePlan = async (req, res) => {
  try {
      if (!req.userId) {
          console.error("User ID not set in request object.");
          return res.status(401).json({
              message: "Admin not authenticated",
              error: true,
              success: false
          });
      }

      console.log("Authenticated User ID:", req.userId);
      const { newPlan } = req.body;

      if (!newPlan || typeof newPlan !== 'string') {
          return res.status(400).json({
              message: "Invalid plan details",
              error: true,
              success: false
          });
      }

      const updatedAdmin = await Admin.findByIdAndUpdate(
          req.userId,
          { plan: newPlan },
          { new: true, runValidators: true }
      );

      if (!updatedAdmin) {
          return res.status(404).json({
              message: "Admin not found",
              error: true,
              success: false
          });
      }

      res.status(200).json({
          message: "Plan updated successfully",
          data: updatedAdmin,
          error: false,
          success: true
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({
          message: "Internal server error",
          error: true,
          success: false
      });
  }
};

const getcurrentAdmin = async(req, res) => {
  try {
    if (!req.userId) {
        console.error("User ID not set in request object.");
        return res.status(401).json({
            message: "Admin not authenticated",
            error: true,
            success: false
        });
    }

    console.log("Authenticated User ID:", req.userId);


    const admin = await Admin.findByIdAndUpdate(
        req.userId,
    );

    res.status(200).json({
        message: "Plan updated successfully",
        data: admin,
        error: false,
        success: true
    });
} catch (err) {
    console.error(err);
    res.status(500).json({
        message: "Internal server error",
        error: true,
        success: false
    });
}
}





module.exports = {
  registerAdmin,
  loginAdmin,
  updatePlan,
  getcurrentAdmin
};