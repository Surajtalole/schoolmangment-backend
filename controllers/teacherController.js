const bcrypt = require("bcrypt");
const Teacher = require("../models/teacherModel");

exports.addTeacher = async (req, res)=>{
    const {firstName, lastName, email,gender,password}=req.body;

    try{
        const schoolId = req.user.id;
        const saltRounds  = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);

        const newTeacher = new Teacher({
            firstName,
            lastName,
            email,
            gender,
            password:hashedPassword,
            schoolId
        });

        await newTeacher.save();
        res.status(201).json({message : "Teacher added successfully"});
    } catch (error){
        res.status(400).json({error: "Error adding teacher", details: error});

    }
};

exports.getTeachers = async (req, res)=>{
    try{
        const teachers = await Teacher.find({schoolId:req.user.id});
        res.status(200).json({teachers});
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"});
    }
};