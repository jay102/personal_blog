import PostController from '../controllers/postController';
import BlogPost from '../database/models/Posts'
const multerSetup = require('../middlewares/multer');
const multer = require('multer');
import express from 'express'

let controller = new PostController(BlogPost);
const { multerInit } = multerSetup(multer);
const blogPostRouter = () => {
  const router = express.Router();
  //Create Blogpost
  router.route('/new-post')
    .post(multerInit.single('image_url'), controller.newPost)

  // get all blogposts
  router.route('/')
    .get(controller.getAllposts)

  // get limited blogposts for dashboard
  router.route('/limit/:page')
    .get(controller.getLimitedPosts)

  // get posts count
  router.route('/posts-count')
    .get(controller.getPostNo)

  // get blogpost by id
  router.route('/:postid')
    .get(controller.getPostById)
    .delete(controller.deletePost)
    .put(controller.editPost)

  // get article by url
  router.route('/tag/:articleUrl')
    .get(controller.articleByUrl)
  return router;
};
export default blogPostRouter;