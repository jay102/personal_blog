"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Op } = require('sequelize');
class TagsController {
    constructor(Tag, BlogPost) {
        this.addTag = (req, res, next) => {
            this.Tag.create(req.body)
                .then((response) => {
                res.status(200).json({
                    message: "tag added successfully",
                    tag: response
                });
            })
                .catch((err) => {
                res.json({
                    error: err
                });
            });
        };
        this.getTags = (req, res, next) => {
            this.Tag.findAll()
                .then((response) => {
                res.status(201).json({ tags: response });
            })
                .catch((err) => {
                res.json({ error: "an error occured" });
            });
        };
        this.deleteTag = (req, res, next) => {
            console.log(req.body);
            this.Tag.destroy({
                where: req.body
            })
                .then((response) => {
                res.status(200).json({ message: "tag deleted" });
            })
                .catch((err) => {
                res.json({ error: err });
            });
        };
        this.editTag = (req, res, next) => {
            let values = {
                tag: req.body.tag,
                url: req.body.url,
                class: req.body.class
            };
            let selector = { where: { id: req.body.id } };
            this.Tag.update(values, selector)
                .then((result) => {
                if (result[0] === 1) {
                    return res.status(200).json({
                        message: "Tag Edited Successfully"
                    });
                }
                else {
                    return res.json({
                        error: {
                            message: "Could not Edit tag"
                        }
                    });
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ error: { message: err } });
            });
        };
        this.getArticlesByTag = (req, res, next) => {
            this.BlogPost.findAll({ where: { tags: { [Op.iLike]: `%${req.params.tag}%` } } })
                .then((response) => {
                res.status(201).json({ articles: response });
            })
                .catch((err) => {
                res.json({ error: err });
            });
        };
        this.Tag = Tag;
        this.BlogPost = BlogPost;
    }
}
exports.default = TagsController;
