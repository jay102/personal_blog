import { Request, Response, NextFunction } from 'express';


class postController {
    BlogPost: any;
    Media: any;
    cloudinary: any;
    constructor(private Models?: any, private middlewares?: any, ) {
        const { BlogPost, Media } = Models;
        const { cloudinary } = middlewares;
        Object.assign(this, Models, middlewares);
    }
    //new post
    newPost = (req: Request, res: Response, next: NextFunction) => {
        let featured_img: string | undefined;
        let author: string = req.body.author;
        let title: string = req.body.title;
        let post_url: string = req.body.post_url;
        let body: string = req.body.body;
        let time: string = req.body.time;
        let tags: string = req.body.tags;
        const { file } = (<any>req)
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
            .then((result: any) => {
                outer.Media.create({
                    url: file.url,
                    publicId: file.public_id,
                }).then((result: any) => {
                    return res.status(201).json({
                        message: "Successful",
                        Posts: result
                    })
                })
            })
            .catch((err: any) => {
                return res.status(500).json({
                    Error: err
                })
            })
    }

    postImage = (req: Request, res: Response, next: NextFunction) => {
        const { file } = (<any>req)
        if (file) {
            this.Media.create({
                url: file.url,
                publicId: file.public_id,
            }).then((result: any) => {
                return res.status(200).json({ "data": { "url": file.url } })
            }).catch((err: any) => {
                console.log(err);
            })
        } else {
            return res.status(400).json({ "error": 400 })
        }
    }
    // delete media
    deleteImage = (req: Request, res: Response, next: NextFunction) => {
        const id = req.body.id;
        const outer = this;
        this.cloudinary.v2.uploader
            .destroy(id, (error: any, result: any) => {
                if (result.result === "ok") {
                    outer.Media.destroy({
                        where: { publicId: id }
                    }).then((result: any) => {
                        res.status(200).json(result)
                    })
                } else {
                    res.status(200).json(result)
                }

            });
    }
    //get all posts
    getAllposts = (req: Request, res: Response, next: NextFunction) => {
        this.BlogPost.findAll()
            .then((result: any) => {
                return res.status(201).json({
                    message: "successful",
                    Posts: result
                })
            })
            .catch((err: any) => {
                return res.status(500).json({
                    Error: err
                })
            })
    }
    //count posts
    getPostNo = (req: Request, res: Response, next: NextFunction) => {
        this.BlogPost.count()
            .then((result: any) => {
                return res.status(200).json({
                    message: "successful",
                    Posts: result
                })
            })
            .catch((err: any) => {
                return res.status(500).json({
                    Error: err
                })
            })
    }
    //get limited number of posts 
    getLimitedPosts = (req: Request, res: Response, next: NextFunction) => {
        console.log(req.params.page)
        this.BlogPost.findAll({ limit: 10, offset: req.params.page })
            .then((result: any) => {
                return res.status(200).json({
                    message: "successful",
                    Posts: result
                })
            })
            .catch((err: any) => {
                return res.status(500).json({
                    Error: err
                })
            })
    }
    //get post by id
    getPostById = (req: Request, res: Response, next: NextFunction) => {
        let id: string = req.params.id
        this.BlogPost.findOne({
            where: { id: id }
        })
            .then((result: any) => {
                return res.status(200).json({
                    message: "success",
                    Post: result
                })
            })
            .catch((err: any) => {
                return res.status(500).json({
                    Error: err
                })
            })
    }
    // delete post by id
    deletePost = (req: Request, res: Response, next: NextFunction) => {
        let postid: string = req.params.postid;
        console.log(postid, "post_id")
        this.BlogPost.destroy({ where: { id: postid } })
            .then((result: any) => {
                if (result === 1) {
                    return res.status(200).json({ message: "post deleted successfully" })
                }
            }).catch((err: any) => console.log(err))
    }

    editPost = (req: Request, res: Response, next: NextFunction) => {
        let featured_img: string | undefined;
        const { file } = (<any>req)
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
            .then((result: any) => {
                if (result[0] === 1) {
                    return res.status(200).json({
                        message: "Post Edited Successfully"
                    });
                } else {
                    return res.status(401).json({
                        error: {
                            message: "Could not Edit post"
                        }
                    });
                }
            })
            .catch((err: string) => {
                console.log(err)
                res.status(500).json({ error: { message: err } })
            });
    }

    articleByUrl = (req: Request, res: Response, next: NextFunction) => {
        let url: string = req.params.articleUrl;
        console.log(url, "postURL");
        this.BlogPost.findOne({ where: { post_url: url } })
            .then((result: any) => {
                return res.status(200).json({ status: "successful", article: result })
            })
            .catch((err: any) => {
                return res.status(401).json({ error: err })
            })
    }
};
export default postController;