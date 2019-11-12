"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class postController {
    constructor(Models, middlewares) {
        this.Models = Models;
        this.middlewares = middlewares;
        //new post
        this.newPost = (req, res, next) => {
            let featured_img;
            let author = req.body.author;
            let title = req.body.title;
            let post_url = req.body.post_url;
            let body = req.body.body;
            let time = req.body.time;
            let tags = req.body.tags;
            const { file } = req;
            if (file) {
                featured_img = file.url;
            }
            const outer = this;
            this.BlogPost.create({
                author,
                title,
                post_url,
                body,
                time,
                tags,
                featured_img,
            })
                .then((result) => {
                outer.Media.create({
                    url: file.url,
                    publicId: file.public_id,
                }).then((result) => {
                    return res.status(201).json({
                        message: "Successful",
                        Posts: result
                    });
                });
            })
                .catch((err) => {
                return res.status(500).json({
                    Error: err
                });
            });
        };
        this.postImage = (req, res, next) => {
            const { file } = req;
            if (file) {
                this.Media.create({
                    url: file.url,
                    publicId: file.public_id,
                }).then((result) => {
                    return res.status(200).json({ "data": { "url": file.url } });
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                return res.status(400).json({ "error": 400 });
            }
        };
        // delete media
        this.deleteImage = (req, res, next) => {
            const id = req.body.id;
            const outer = this;
            this.cloudinary.v2.uploader
                .destroy(id, (error, result) => {
                if (result.result === "ok") {
                    outer.Media.destroy({
                        where: { publicId: id }
                    }).then((result) => {
                        res.status(200).json(result);
                    });
                }
                else {
                    res.status(200).json(result);
                }
            });
        };
        //get all posts
        this.getAllposts = (req, res, next) => {
            let offset = parseInt(req.params.offset);
            const pageSize = parseInt(req.params.pageSize);
            const limit = pageSize;
            this.BlogPost.findAndCountAll({ limit, offset })
                .then((result) => {
                return res.status(201).json({
                    message: "successful",
                    Posts: result.rows
                });
            })
                .catch((err) => {
                return res.status(500).json({
                    Error: err
                });
            });
        };
        //count posts
        this.getPostNo = (req, res, next) => {
            this.BlogPost.count()
                .then((result) => {
                return res.status(200).json({
                    message: "successful",
                    Posts: result
                });
            })
                .catch((err) => {
                return res.status(500).json({
                    Error: err
                });
            });
        };
        //get limited number of posts 
        this.getLimitedPosts = (req, res, next) => {
            this.BlogPost.findAll({ limit: req.params.limit })
                .then((result) => {
                return res.status(200).json({
                    message: "successful",
                    Posts: result
                });
            })
                .catch((err) => {
                return res.status(500).json({
                    Error: err
                });
            });
        };
        //get post by id
        this.getPostById = (req, res, next) => {
            let id = req.params.id;
            this.BlogPost.findOne({
                where: { id: id }
            })
                .then((result) => {
                return res.status(200).json({
                    message: "success",
                    Post: result
                });
            })
                .catch((err) => {
                return res.status(500).json({
                    Error: err
                });
            });
        };
        // delete post by id
        this.deletePost = (req, res, next) => {
            let postid = req.params.postid;
            console.log(postid, "post_id");
            this.BlogPost.destroy({ where: { id: postid } })
                .then((result) => {
                if (result === 1) {
                    return res.status(200).json({ message: "post deleted successfully" });
                }
            }).catch((err) => console.log(err));
        };
        this.editPost = (req, res, next) => {
            let featured_img;
            const { file } = req;
            if (file) {
                featured_img = file.filename;
            }
            let values = {
                title: req.body.title,
                body: req.body.body,
                post_url: req.body.post_url,
                time: req.body.time,
                author: req.body.author,
                tags: req.body.tags,
                featured_img: featured_img
            };
            let selector = { where: { id: req.params.postid } };
            this.BlogPost.update(values, selector)
                .then((result) => {
                if (result[0] === 1) {
                    return res.status(200).json({
                        message: "Post Edited Successfully"
                    });
                }
                else {
                    return res.status(401).json({
                        error: {
                            message: "Could not Edit post"
                        }
                    });
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ error: { message: err } });
            });
        };
        this.articleByUrl = (req, res, next) => {
            let url = req.params.articleUrl;
            console.log(url, "postURL");
            this.BlogPost.findOne({ where: { post_url: url } })
                .then((result) => {
                return res.status(200).json({ status: "successful", article: result });
            })
                .catch((err) => {
                return res.status(401).json({ error: err });
            });
        };
        const { BlogPost, Media } = Models;
        const { cloudinary } = middlewares;
        Object.assign(this, Models, middlewares);
    }
}
;
exports.default = postController;
