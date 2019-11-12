import PostController from '../controllers/postController';
import BlogPost from '../database/models/Posts'
import Media from '../database/models/Media';
const multerSetup = require('../middlewares/multer');
const cloudinary = require('cloudinary');
import express from 'express';


const { multerInit } = multerSetup;
const Models = {
  BlogPost, Media
}
const middlewares = { cloudinary }

let controller = new PostController(Models, middlewares);
const blogPostRouter = () => {
  const router = express.Router();
  //Create Blogpost
  router.route('/new-post')
    .post(multerInit.single('image_url'), controller.newPost)

  // get limited blogposts for dashboard
  router.route('/limit/:limit')
    .get(controller.getLimitedPosts)

  // get article by url
  router.route('/tag/:articleUrl')
    .get(controller.articleByUrl)

  // get all blogposts
  router.route('/:offset/:pageSize')
    .get(controller.getAllposts)


  // post images for post
  router.route('/images')
    .post(multerInit.single('image'), controller.postImage)
    .delete(controller.deleteImage)

  // get posts count
  router.route('/posts-count')
    .get(controller.getPostNo)

  // get blogpost by id
  router.route('/:postid')
    .get(controller.getPostById)
    .delete(controller.deletePost)
    .put(multerInit.single('image_url'), controller.editPost)


  return router;
};
export default blogPostRouter();