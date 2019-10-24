"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Tags_1 = __importDefault(require("../database/models/Tags"));
const Posts_1 = __importDefault(require("../database/models/Posts"));
const tagsController_1 = __importDefault(require("../controllers/tagsController"));
const Tags = () => {
    const router = express_1.default.Router();
    const controller = new tagsController_1.default(Tags_1.default, Posts_1.default);
    router.route('/')
        .get(controller.getTags)
        .post(controller.addTag)
        .delete(controller.deleteTag)
        .put(controller.editTag);
    router.route('/:tag')
        .get(controller.getArticlesByTag);
    return router;
};
exports.default = Tags();
