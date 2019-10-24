"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../controllers/adminController"));
const Admin_1 = __importDefault(require("../database/models/Admin"));
const multerSetup = require('../middlewares/multer');
const { multerInit, dataUri } = multerSetup;
const AdminRoutes = () => {
    const router = express_1.default.Router();
    const adminController = new adminController_1.default(Admin_1.default);
    // find admin
    router.route('/:id')
        .get(adminController.details);
    // login route
    router.route('/login')
        .post(adminController.login);
    // post password to db route
    router.route('/:password')
        .post(adminController.postPassword);
    router.route('/image/:id')
        .put(multerInit.single('image_url'), adminController.updateImage);
    return router;
};
exports.default = AdminRoutes();
