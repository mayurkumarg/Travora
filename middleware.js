const Listing = require("./models/listing.js");
const Review = require("./models/reviewSchema.js");
const customError=require("./utils/customError.js")
const { listingJoiSchema, reviewJoiSchema } = require("./schema_validation.js");


//server-side schema validation - listings
module.exports.validateListing = (req, res, next) => {
  const { error, value } = listingJoiSchema.validate(req.body.listing); // <--- validate req.body.listing

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new customError(400, error.details[0].message);
  }

  req.body.listing = value; // use Joi’s sanitized data
  next();
};


// server-side schema validation - review
module.exports.validateReview = (req, res, next) => {
  const { error, value } = reviewJoiSchema.validate(req.body);

  if (error) {
    throw new customError(400, error.details[0].message);
  }

  req.body = value; // use Joi’s sanitized data
  next();
};


module.exports.isLoggedIn=(req,res,next)=>{
    if(! req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be 'Logged-in' before doing any operation")
        return res.redirect("/users/login")
  }
  next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review= await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not allowed to delete this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
