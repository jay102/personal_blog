"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Media_1 = __importDefault(require("../database/models/Media"));
const mediaController_1 = __importDefault(require("../controllers/mediaController"));
const cloudinary = require('cloudinary');
const multerSetup = require('../middlewares/multer');
// initialize multer for media
const { multerInit } = multerSetup;
// cloudinary
const middlewares = { cloudinary };
const Media = () => {
    const router = express_1.default.Router();
    const controller = new mediaController_1.default(Media_1.default, middlewares);
    router.route('/')
        .get(controller.getAllMedia)
        .post(multerInit.single('image'), controller.addMedia)
        .delete(controller.deleteMedia);
    return router;
};
exports.default = Media();
