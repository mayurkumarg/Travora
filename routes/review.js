const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/wrapAsync.js");
const Review = require("../models/reviewSchema.js");
const Listing = require("../models/listing.js");  
const {isLoggedIn, isOwner, isReviewAuthor,validateReview} =require("../middleware.js");

const reviewController=require("../controllers/reviews.js");


// Add new Review
router.post("/:id/review", isLoggedIn,validateReview, asyncWrap(reviewController.addReview));

// Delete Review
router.delete("/:id/reviews/:reviewId", isLoggedIn, isReviewAuthor, asyncWrap(reviewController.destroyReview));

module.exports = router;
