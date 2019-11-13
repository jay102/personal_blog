import { Request, Response, NextFunction } from 'express';
const { Op } = require('sequelize');
class TagsController {
  Tag: any;
  BlogPost: any;
  constructor(Tag: any, BlogPost: any) {
    this.Tag = Tag;
    this.BlogPost = BlogPost;
  }

  addTag = (req: Request, res: Response, next: NextFunction) => {
    this.Tag.create(req.body)
      .then((response: any) => {
        res.status(200).json({
          message: "tag added successfully",
          tag: response
        })
      })
      .catch((err: string) => {
        res.json({
          error: err
        })
      })
  }

  getTags = (req: Request, res: Response, next: NextFunction) => {
    this.Tag.findAll()
      .then((response: any) => {
        res.status(201).json({ tags: response })
      })
      .catch((err: string) => {
        res.json({ error: "an error occured" })
      })
  }

  deleteTag = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    this.Tag.destroy({
      where: req.body
    })
      .then((response: any) => {
        res.status(200).json({ message: "tag deleted" })
      })
      .catch((err: string) => {
        res.json({ error: err })
      })
  }

  editTag = (req: Request, res: Response, next: NextFunction) => {
    let values = {
      tag: req.body.tag,
      url: req.body.url,
      class: req.body.class
    };
    let selector = { where: { id: req.body.id } };
    this.Tag.update(values, selector)
      .then((result: any) => {
        if (result[0] === 1) {
          return res.status(200).json({
            message: "Tag Edited Successfully"
          });
        } else {
          return res.json({
            error: {
              message: "Could not Edit tag"
            }
          });
        }
      })
      .catch((err: string) => {
        console.log(err)
        res.status(500).json({ error: { message: err } })
      });
  }

  getArticlesByTag = (req: Request, res: Response, next: NextFunction) => {
    let offset: any = parseInt(req.params.offset);
    const pageSize: any = parseInt(req.params.pageSize);
    const limit = pageSize;
    this.BlogPost.findAll({ where: { tags: { [Op.iLike]: `%${req.params.tag}%` } }, limit, offset })
      .then((response: any) => {
        res.status(201).json({ articles: response })
      })
      .catch((err: string) => {
        res.json({ error: err })
      })
  }
}
export default TagsController;