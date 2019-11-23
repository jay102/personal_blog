require('dotenv').config()
const moment = require('moment');
const multer = require('multer');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");


const setupMulter = () => {
  cloudinary.config({
    cloud_name: 'jaycodes-blog',
    api_key: '139952982712551',
    api_secret: 'Z_1E7JBwNLTZUOzWu2THvXII27A',
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
