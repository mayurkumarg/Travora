const flash=require("connect-flash");
const User = require("../models/user.js");
const passport = require("passport");

// SignUP GET Route
module.exports.renderSignUp=(req, res) => {
    res.render("users/signup"); 
}


//Signup New User
module.exports.signupNewUser=async (req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=new User({email,username})
        let registeredUser = await User.register(newUser, password);

        req.login(registeredUser,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success","Welcome to TRAVORA !");
            // console.log("User Registed Successfully ! : ",registeredUser);
            res.redirect("/listings");
        });
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/users/signup")
    }
}


// Login GET Route
module.exports.renderLogin=(req, res) => {
  
    res.render("users/login");
}


//Login Post Route
module.exports.updateLogin=async(req,res)=>{

        req.flash("success","Welcome back to TRAVORA !");
        res.redirect(res.locals.redirectUrl || "/listings"); 
}


//LogOut Route
module.exports.logoutFromPage=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","Logged you out !");
        res.redirect("/listings")
    })
}