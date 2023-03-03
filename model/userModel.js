const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    gender: String,
    password:String,
    profile_pic: String,
    role:String,
    department:String,
    employee_type:String,
    mobilenumber:Number,
    email:String,
    package:String,
    access_Roll:String,
    referral:String,
    interview_date:String,
    joining_date:String,
    interviewer:String,
    performance:String,
    feedback:String,
    employee_id:Number,
    state:String,
    city:String,
    street:String,
    postal_code:Number,
    achivement:[
        {title:String,
        title_id:String,
        year:Number}
    ],
    project:[
        {
        title:String,
        project_id:String,
        process:String,
        year:Number,
        month:Number,
    }]

})

mongoose.model('users',userSchema);
module.exports = mongoose.model('users')