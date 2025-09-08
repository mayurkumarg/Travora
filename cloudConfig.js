const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});



// configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'travora_dev',         // folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'tiff'],  // allowed file types
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // optional
  },
});


module.exports={
    cloudinary,
    storage
}