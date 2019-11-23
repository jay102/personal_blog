import express from 'express'
import User from '../database/models/Posts'
import usersController from '../controllers/usersControlller';

const Users = () => {
  const router = express.Router();
  const controller = new usersController(User);

  router.route('/')
    .post(controller.addUser)
    .get(controller.getUsers)

  router.route('/:id')
    .put(controller.editUser)
    .delete(controller.deleteUser)
  router.route('/image')
    .put(controller.uploadUserImage)

  return router;
}

export default Users();