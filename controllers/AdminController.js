const Register = require('../models/RegisterModel');

const nodemailer = require('nodemailer');

const cookie = require('cookie-parser');

const bcrypt = require("bcrypt");
const saltRounds = 10;

const home = (req,res) => {
    return res.render('home');
}  


const dash = (req,res) => {
    return res.render('admin/dash');
}   


const register = (req,res) => {
    return res.render('register');
}

const login = (req,res) => { 
    if(res.locals.userlogin){
        return res.redirect('admin/dash');
    }
    return res.render('login');
}

const registerData = async(req,res) => {

    try{
        const {name,email,password,cpassword} = req.body;

        if(password == cpassword){
            let user = await Register.create({
                name : name,
                email : email,
                password : await bcrypt.hash(password,saltRounds),
            })
            if(user){
                console.log("User successfully register");
                return res.redirect('admin');
            }else{
                console.log("User not successfully register");
                return res.redirect('back');
            }
        }else{
            console.log("Password and Confirm password not natch");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }     
}

const loginData = (req,res) => {
    return res.redirect('admin/dash');
}

const forget = (req,res) => {
    return res.render('forget');
}

const forgotpass = async(req,res) => {
   try{
        let email = req.body.email;
        let user = await Register.findOne({email : email});
        if(user){
            let otp = Math.floor(Math.random() * 1000000);

            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'rebeca.metz70@ethereal.email',
                    pass: 'Q52D6B1X3j8MknN9hr'
                }
            });
              let mailOptions = {
                from: 'bhojanip881@gmail.com',
                to: email,
                subject: 'Forgot password',
                text: 'Otp :- '+otp
              };

              transporter.sendMail(mailOptions, function(error, info){
                if(error) {
                  console.log(error);
                } else {
                    let obj = {
                        email : email,
                        otp : otp
                    }
                    res.cookie('otp',obj)
                  console.log('Email sent: ' + info.response);
                  return res.redirect('admin/otp');
                } 
              });
        }else{
            console.log("User not found");
            return res.redirect('back');
        }
   }catch(err){
        console.log(err);
        return res.redirect('back');
   }
}

const otp = (req,res) => {
    return res.render('otp');
}

const otpData = (req,res) => {
    let otp = req.cookies.otp.otp;
    if(otp == req.body.otp){
        return res.redirect('/newpass');
    }else{
        console.log("Otp is wrong");
        return res.redirect('back');
    }
}

const newpass = (req,res) => {
    return res.render('newpass');
}

const logout = (req,res) => {
    req.logout((err)=>{
        if(err){
            console.log(err);
            return false;
        }
        return res.redirect('/admin');
    })
}
const newpassData = async(req,res) => {
    try{
        if(req.body.password == req.body.cpassword){
            let email = req.cookies.otp.email;
            let data = await Register.findOneAndUpdate({email},{
                password : await bcrypt.hash(req.body.password,saltRounds),
            });
            if(data){
                console.log("Passworrd successfully update");
                res.clearCookie('otp');
                return res.redirect('/');
            }else{
                console.log("Password not update");
                return res.redirect('back'); 
            }
        }else{
            console.log("Password and confirm password not match");
            return res.redirect('back'); 
        }
           
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports = {
                    home,
                    dash,
                    register,
                    login,
                    registerData,
                    loginData,
                    forget,
                    forgotpass,
                    otp,
                    otpData,
                    newpass,
                    logout,
                    newpassData
};