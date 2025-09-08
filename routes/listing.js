const express=require("express");
const router=express.Router({mergeParams:true});
const asyncWrap=require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const flash=require("connect-flash");
const {isLoggedIn, isOwner, validateListing} =require("../middleware.js");

// To handle file uploads (like images, PDFs, etc.) from forms.
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage}) //destination to store in cloudinary

const listingController=require("../controllers/listings.js");


//Routing all url with /listings
router.route("/")

    //Main page Route
    .get(asyncWrap(listingController.index))

    // Add new list and redirect to Listings Route 
    .post(isLoggedIn, upload.single('listings[image]'),validateListing, asyncWrap(listingController.addNewList))


//New list form Route
//Check if user Authenticated, else redirect to login
router.get("/new",isLoggedIn, listingController.renderNewListForm)


//Routing all url with /listings/:id
router.route("/:id")

    //To view perticular List Route
    .get(asyncWrap(listingController.renderList))

    //Update list Route
    .put(isLoggedIn,isOwner, upload.single('listings[image]'),validateListing, asyncWrap(listingController.updateList))

    //Delete Route
    .delete(isLoggedIn,isOwner, asyncWrap(listingController.destroyList))




//Render perticular list to edit Route
router.get("/:id/edit",isLoggedIn,isOwner,asyncWrap(listingController.renderListEdit))




module.exports=router;


