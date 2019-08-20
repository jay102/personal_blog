import { Request, Response, NextFunction } from 'express'
import BlogPost from '../../database/models/Posts'

export let newpost = (req: Request, res: Response, next: NextFunction) => {
    //res.send("Success from server")
    const author = req.body.author;
    const title = req.body.title;
    const post_url = req.body.post_url;
    const body = req.body.body;
    const time = req.body.time;
    BlogPost.create({
        author,
        title,
        post_url,
        body,
        time
    })
        .then((result: any) => {
            res.status(200).json({
                message: "Successful",
                Posts: result
            })
        })
        .catch((err: any) => {
            res.status(500).json({
                Error: err
            })
        })
}
//get all posts
export let getAllposts = (req: Request, res: Response, next: NextFunction) => {
    BlogPost.findAll()
        .then((result: any) => {
            res.status(200).json({
                message: "successful",
                Posts: result
            })
        })
        .catch((err: any) => {
            res.status(500).json({
                Error: err
            })
        })
}

//get limited number of posts 
export let getLimitedPosts = (req: Request, res: Response, next: NextFunction) => {
    BlogPost.findAll({ limit: 10 })
        .then((result: any) => {
            res.status(200).json({
                message: "successful",
                Posts: result
            })
        })
        .catch((err: any) => {
            res.status(500).json({
                Error: err
            })
        })
}
//count posts
export let getPostNo = (req: Request, res: Response, next: NextFunction) => {
    BlogPost.count()
        .then((result: any) => {
            res.status(200).json({
                message: "successful",
                Posts: result
            })
        })
        .catch((err: any) => {
            res.status(500).json({
                Error: err
            })
        })
}
//get post by id
export let getPostById = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id
    BlogPost.findOne({
        where: { id: id }
    })
        .then((result: any) => {
            res.status(200).json({
                message: "success",
                Post: result
            })
        })
        .catch((err: any) => {
            res.status(500).json({
                Error: err
            })
        })
}