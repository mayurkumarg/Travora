const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/wrapAsync.js");
const customError = require("../utils/customError.js");
const {saveRedirectUrl} =require("../middleware.js");
const userController=require("../controllers/users.js")
const flash=require("connect-flash");
const User = require("../models/user.js");
const passport = require("passport");


router.route("/signup")

    // SignUP GET Route
    .get(userController.renderSignUp)

    //Signup New User
    .post(asyncWrap(userController.signupNewUser))


router.route("/login")

    // Login GET Route
    .get(userController.renderLogin )

    //Login Post Route
    .post(
        saveRedirectUrl, 
        passport.authenticate("local",{
            failureRedirect:"/users/login",
            failureFlash:true
        }),
        asyncWrap(userController.updateLogin))



//LogOut Route
router.get("/logout",userController.logoutFromPage)

module.exports = router;
