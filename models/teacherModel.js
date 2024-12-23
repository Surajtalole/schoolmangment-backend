const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    firstName :{type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true,unique:true},
    gender:{type:String, required:true},
    password :{type:String, required:true},
    schoolId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    role: { type: String, default: 'teacher' },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;