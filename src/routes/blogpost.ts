import { newpost, getAllposts, getLimitedPosts, getPostById, getPostNo } from './../controllers/postController';
import express from 'express'

const router = express.Router();


//Create Blogpost
router.post('/new-post', newpost)

//get all blogposts
router.get('/', getAllposts)

//get limited blogposts for dashboard
router.get('/limit', getLimitedPosts)

//get number of postss
router.get('/posts-count', getPostNo)

//get blogpost by id
router.get('/:postid', getPostById)

export default router;