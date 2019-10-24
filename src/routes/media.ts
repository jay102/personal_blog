import express from 'express'
import MediaModel from '../database/models/Media';
import mediaController from '../controllers/mediaController';
const cloudinary = require('cloudinary');
const multerSetup = require('../middlewares/multer');

// initialize multer for media
const { multerInit } = multerSetup;

// cloudinary
const middlewares = { cloudinary }

const Media = () => {
  const router = express.Router();
  const controller = new mediaController(MediaModel, middlewares)
  router.route('/')
    .get(controller.getAllMedia)
    .post(multerInit.single('image'), controller.addMedia)
    .delete(controller.deleteMedia)

  return router;
}

export default Media();