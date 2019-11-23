require('dotenv').config()
const moment = require('moment');
const multer = require('multer');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");


const setupMulter = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "uploads",
    allowedFormats: ["jpg", "png", "gif"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
  const multerInit = multer({ storage: storage });
  return {
    multerInit,
  };
}
module.exports = setupMulter();
