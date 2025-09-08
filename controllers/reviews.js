const Review = require("../models/reviewSchema.js");
const Listing = require("../models/listing.js");

// Add new Review
module.exports.addReview=async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author=req.user._id;
  listing.review.push(newReview);

  await listing.save();
  await newReview.save();
  req.flash("success","New Review Given Successfully !")
  console.log(newReview);
  res.redirect(`/listings/${req.params.id}`);
}

// Delete Review
module.exports.destroyReview=async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted Successfully !")
  res.redirect(`/listings/${id}`);
}