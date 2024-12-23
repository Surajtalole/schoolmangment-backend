// routes.js
const authenticate = require("../middlewares/authMiddleware")
const express = require('express');


const { registerAdmin, loginAdmin, updatePlan, getcurrentAdmin } = require('../controllers/adminController');

const {addTeacher} = require("../controllers/teacherController");
const { getTeachers } = require("../controllers/teacherController");
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router();


router.post('/signup', registerAdmin);

router.post('/login', loginAdmin)
router.put('/updateplan',authenticate, updatePlan)
router.get('/getcurrentadmin',authenticate, getcurrentAdmin)


router.post('/login', loginAdmin);
router.post('/addTeacher',authMiddleware, addTeacher);
router.get('/teachers',authMiddleware, getTeachers);


module.exports = router;
