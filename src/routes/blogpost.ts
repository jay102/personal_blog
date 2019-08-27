import PostController from '../controllers/postController';
import BlogPost from '../../database/models/Posts'
import express from 'express'


const blogPostRouter = () => {
  const router = express.Router();
  let controller = new PostController(BlogPost);

  //Create Blogpost
  router.route('/new-post')
    .post(controller.newPost)

  // get all blogposts
  router.route('/')
    .get(controller.getAllposts)

  // get limited blogposts for dashboard
  router.route('/limit')
    .get(controller.getLimitedPosts)

  // get posts count
  router.route('/posts-count')
    .get(controller.getPostNo)

  // get blogpost by id
  router.route('/:postid')
    .get(controller.getPostById)
    .delete(controller.deletePost)
    .put(controller.editPost)
  return router;
};
export default blogPostRouter;