import express from 'express'
import AdminController from '../controllers/adminController'
import Admin from '../../database/models/Admin'
const multerSetup = require('../middlewares/multer');
const multer = require('multer');

const AdminRoutes = () => {
    const { multerInit } = multerSetup(multer);
    const router = express.Router();
    const adminController = new AdminController(Admin);
    // login route
    router.route('/login')
        .post(adminController.login)

    // post password to db route
    router.route('/:password')
        .post(adminController.postPassword)

    router.route('/image/:id')
        .put(multerInit.single('image_url'), adminController.updateImage)
    return router;
}
export default AdminRoutes;