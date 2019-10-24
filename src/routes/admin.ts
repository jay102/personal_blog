import express from 'express'
import AdminController from '../controllers/adminController'
import Admin from '../database/models/Admin'
const multerSetup = require('../middlewares/multer');
const { multerInit, dataUri } = multerSetup;

const AdminRoutes = () => {
    const router = express.Router();
    const adminController = new AdminController(Admin);
    // find admin
    router.route('/:id')
        .get(adminController.details)

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
export default AdminRoutes();