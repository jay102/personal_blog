import express, { Request, Response, NextFunction } from 'express'
import AdminController from '../controllers/adminController'
import Admin from '../../database/models/Admin'

const AdminRoutes = () => {
    const router = express.Router();
    const adminController = new AdminController(Admin);
    // login route
    router.route('/login')
        .post(adminController.login)

    // post password to db route
    router.route('/:password')
        .post(adminController.postPassword)
    return router;
}
export default AdminRoutes;