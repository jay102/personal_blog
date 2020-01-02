import express from 'express'
import User from '../database/models/Users';
import Media from '../database/models/Media';
const multerSetup = require('../middlewares/multer');
import usersController from '../controllers/usersControlller';

const { multerInit } = multerSetup;

const Users = () => {
  const router = express.Router();
  const controller = new usersController(User, Media);

  router.route('/')
    .post(controller.addUser)
    .get(controller.getUsers)

  router.route('/:id')
    .put(controller.editUser)
    .delete(controller.deleteUser)
  router.route('/image')
    .put(multerInit.single('image'), controller.uploadUserImage)

  return router;
}
export default Users();