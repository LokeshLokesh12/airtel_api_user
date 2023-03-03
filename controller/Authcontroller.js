const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userModel');
const { updateOne } = require('../model/userModel');
const ObjectID = require('mongodb').ObjectId;
const shortid = require('shortid')


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());



//get All users
router.get('/users',(req,res) => {
    User.find({},(err,data) => {
        if(err) throw err;
        res.send(data)
    })
})



//registerUser
router.post('/register',(req,res) => {
    console.log(req.body)
    User.find({employee_id:req.body.employee_id},(err,data) => {
        if(err) throw err;
        if(data.length>0){
            res.send( {'message':'Employee ID Already Used'})
        }else{ 
            let hashpassword = bcrypt.hashSync(req.body.password,8);
            User.create({
                name:req.body.last_name?`${req.body.first_name} ${req.body.last_name}`:req.body.first_name,
                email:req.body.email,
                password:hashpassword,
                role:req.body.role,
                gender:req.body.gender,
                profile_pic: req.body.profile_pic?req.body.profile_pic:req.body.gender == 'male'? "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Manager-512.png":"https://cdn4.iconfinder.com/data/icons/professions-1-2/151/20-512.png",
                department:req.body.department,
                employee_type:req.body.employee_type,
                mobilenumber:Number(req.body.mobile_number),
                package:req.body.Package,
                access_Roll:req.body.access_roll,
                referral:req.body.Referral?req.body.Referral:"",
                interview_date:req.body.interview_date,
                joining_date:req.body.joining_date,
                interviewer:req.body.interviewer,
                performance:req.body.Performance,
                feedback:req.body.feedback,
                employee_id:req.body.employee_id,
                state:req.body.state,
                city:req.body.city,
                street:req.body.address,
                postal_code:req.body.postal_code,
                project:req.body.project,
                achivement:req.body.achivement
            },(err,data) => {
                if(err) return res.send({"message":'Error While Register'});
                res.send({"message":'Registion Successful'})
            }) 
        }
    })
})

// finduser
router.get('/finduser/:employee_id',(req,res) => {
    console.log("find user employee_id >>>", req.params.employee_id);
    // User.find({_id:ObjectID(req.body._id)},(err,data) => {
    User.find({employee_id:req.params.employee_id},(err,data) => {
        if(err) throw err;
        if(data.length > 0){res.send({message:data,code:200})}else{
            res.send({message:"no employee found",code:404})
        } 

    })
})


// update project
router.put('/updateuser/project', (req, res)=>{
    console.log(req.body);
    User.find({employee_id:req.body.employee_id},(err,data) => {
        console.log(data[0].name);
        if(err) throw err;
        if(data.length<0){
            res.send('user not found')
        }
        else{  
            let project_id = shortid.generate()
            console.log( req.body.employee_id);
            User.updateOne({employee_id: (req.body.employee_id) },{ 
                
                $set: {project:[...data[0].project , {
                    title:req.body.title,
                    year:Number(req.body.year),
                    month:Number(req.body.month),
                    process:"ongoing",
                    project_id:req.body.project_id?req.body.project_id:project_id
                }]}
                }
            ,(err,data) => {
                if(err) return res.send({"message":"something went wrong",code:404}),console.log(err);
                res.send({"message":'project assigned Successful',"project_id":project_id,code:200})
            }
        )           
        }
    })
})

// update achivement
router.put('/updateuser/achivement', (req, res)=>{
    console.log(req.body);
    User.find({employee_id:req.body.employee_id},(err,data) => {
        console.log(data[0].name);
        if(err) throw err;
        if(data.length<0){
            res.send('user not found')
        }
        else{  
            let title_id = shortid.generate()
            console.log( req.body.employee_id);
            User.updateOne({employee_id: (req.body.employee_id) },{ 
                
                $set: {achivement:[...data[0].achivement , {
                    title:req.body.title,
                    title_id:title_id,
                    year:Number(req.body.year),
                }]}
                }
            ,(err,data) => {
                if(err) return res.send({"message":"something went wrong",code:404}),console.log(err);
                res.send({"message":'achivement added to the profile',code:200})
            }
        )           
        }
    })
})


// updateuser 
router.put('/updateuser', (req, res)=>{
    console.log(req.body);
    // let newpass =  bcrypt.hashSync(req.body.password,8);
    User.find({employee_id:req.body.employee_id},(err,data) => {
        console.log(data[0].name);
        if(err) throw err;
        if(data.length<0){
            res.send('user not found')
        }
        else{  
            // let hashpassword = bcrypt.hashSync(req.body.password,8);         
            let upop ={}
            if(req.body.name !== "") {upop.name = `${req.body.name}`}
            if(req.body.email !== "") upop.email = req.body.email
            if(req.body.role !== "") upop.role = req.body.role
            if(req.body.gender !== "") upop.gender = req.body.gender
            if(req.body.department !== "") upop.department = req.body.department
            if(req.body.employee_type !== "") upop.employee_type = req.body.employee_type
            if(req.body.mobile_number !== "") upop.mobilenumber = Number(req.body.mobile_number)
            if(req.body.Package !== "") upop.Package = req.body.Package
            if(req.body.access_Roll !== "") upop.access_Roll = req.body.access_Roll
            if(req.body.referral !== "") upop.referral = req.body.referral
            if(req.body.interview_date !== "") upop.interview_date  = req.body.interview_date
            if(req.body.performance !== "") upop.performance = req.body.performance
            if(req.body.feedback !== "") upop.feedback = req.body.feedback
            if(req.body.employee_id !== "") upop.employee_id = req.body.employee_id
            if(req.body.state !== "") upop.state = req.body.state
            if(req.body.city !== "") upop.city = req.body.city
            if(req.body.address !== "") upop.street = req.body.address
            if(req.body.postal_code !== "") upop.postal_code = req.body.postal_code
            if(req.body.joining_date !== "") upop.joining_date = req.body.joining_date
            if(req.body.interviewer !== "") upop.interviewer = req.body.interviewer

            console.log( req.body.employee_id,upop);
            User.updateOne({employee_id: (req.body.employee_id) },{ 
                
                $set: upop
                // name:req.body.last_name?`${req.body.first_name} ${req.body.last_name}`:req.body.first_name,
                // email:req.body.email,
                // role:req.body.role,
                // gender:req.body.gender,
                // department:req.body.department,
                // employee_type:req.body.employee_type,
                // mobilenumber:Number(req.body.mobile_number),
                // package:req.body.package,
                // access_Roll:req.body.access_roll,
                // referral:req.body.Referral?req.body.Referral:"",
                // inretview_date:req.body.interview_date,
                // joining_date:req.body.joining_date,
                // interviewer:req.body.interviewer,
                // performance:req.body.Performance,
                // feedback:req.body.feedback,
                // employee_id:req.body.employee_id,
                // state:req.body.state,
                // city:req.body.city,
                // street:req.body.address,
                // postal_code:req.body.postal_code,
                }
            ,(err,data) => {
                if(err) return res.send({message:"something went wrong"}),console.log(err);
                res.send({message:'update Successful'})
            }
        )           
        }
    })
})


//loginUser
router.post('/login',(req,res) => {
    console.log(req.body);
    User.findOne({employee_id:req.body.employee_id},(err,user) => {
        if(err) return res.send({auth:false,token:'Error while Logging'});
        if(!user) return res.send({auth:false,token:'No Employee Found,check your ID'});
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password)
            if(!passIsValid) return res.send({auth:false,token:'Invalid Password'})
            // in case both valid
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400})//24 hr
            res.send({auth:true,token:token})
        }
    })
})



//userInfo
router.get('/userInfo',(req,res) => {
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'});
    //jwt verify
    jwt.verify(token,config.secret,(err,user) => {
        if(err) return res.send({auth:false,token:'Invalid Token'});
        User.findById(user.id,(err,result) => {
            res.send(result)
        })
    })
})


module.exports = router;