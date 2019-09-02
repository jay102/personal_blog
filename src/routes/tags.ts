import express from 'express'
import Tag from '../../database/models/Tags'
import BlogPost from '../../database/models/Posts'
import TagController from '../controllers/tagsController';

const Tags = () => {
  const router = express.Router();
  const controller = new TagController(Tag, BlogPost)
  router.route('/')
    .get(controller.getTags)
    .post(controller.addTag)
    .delete(controller.deleteTag)
    .put(controller.editTag)

  router.route('/:tag')
    .get(controller.getArticlesByTag)

  return router;
}

export default Tags;