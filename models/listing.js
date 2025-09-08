const { ref, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review=require("./reviewSchema.js");

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: {
        filename: { type: String, default: "listingimage" },
        url: {
        type: String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/049/855/296/small_2x/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg"
        }
    },
    price: Number,
    location: String,
    country: String,
    review:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await review.deleteMany({ _id: { $in: listing.review } });
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
