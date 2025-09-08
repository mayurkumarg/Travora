const Joi = require("joi");
// const Review = require("./models/reviewSchema");

const listingJoiSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("").optional(),
  image: Joi.object({
    filename: Joi.string().default("listingimage"),
    url: Joi.string()
      .uri()
      .default("https://static.vecteezy.com/system/resources/thumbnails/049/855/296/small_2x/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg")
      .optional()
  }).default(), // ensures entire image object has defaults if missing
  price: Joi.number().min(0).required(),
  location: Joi.string().min(2).required(),
  country: Joi.string().min(2).required()
});

const reviewJoiSchema = Joi.object({
  review:Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment:Joi.string().required()
  }
)
})

module.exports = { listingJoiSchema, reviewJoiSchema  };
