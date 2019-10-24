"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postController_1 = __importDefault(require("../controllers/postController"));
const Posts_1 = __importDefault(require("../database/models/Posts"));
const Media_1 = __importDefault(require("../database/models/Media"));
const multerSetup = require('../middlewares/multer');
const cloudinary = require('cloudinary');
const express_1 = __importDefault(require("express"));
const { multerInit } = multerSetup;
const Models = {
    BlogPost: Posts_1.default, Media: Media_1.default
};
const middlewares = { cloudinary };
let controller = new postController_1.default(Models, middlewares);
const blogPostRouter = () => {
    const router = express_1.default.Router();
    //Create Blogpost
    router.route('/new-post')
        .post(multerInit.single('image_url'), controller.newPost);
    // get all blogposts
    router.route('/')
        .get(controller.getAllposts);
    // post images for post
    router.route('/images')
        .post(multerInit.single('image'), controller.postImage)
        .delete(controller.deleteImage);
    // get limited blogposts for dashboard
    router.route('/limit/:page')
        .get(controller.getLimitedPosts);
    // get posts count
    router.route('/posts-count')
        .get(controller.getPostNo);
    // get blogpost by id
    router.route('/:postid')
        .get(controller.getPostById)
        .delete(controller.deletePost)
        .put(multerInit.single('image_url'), controller.editPost);
    // get article by url
    router.route('/tag/:articleUrl')
        .get(controller.articleByUrl);
    return router;
};
exports.default = blogPostRouter();
