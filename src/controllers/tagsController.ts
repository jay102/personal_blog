import { Request, Response, NextFunction } from 'express';
class TagsController {
  Tag: any;
  BlogPost: any;
  constructor(Tag: any, BlogPost: any) {
    this.Tag = Tag;
    this.BlogPost = BlogPost;
  }

  addTag = (req: Request, res: Response, next: NextFunction) => {
    let tag = req.body.tag
    this.Tag.create({
      tag
    })
      .then((response: any) => {
        res.status(200).json({
          message: "tag added successfully",
          tag: response
        })
      })
      .catch((err: any) => {
        res.json({
          error: "an error occured"
        })
      })
  }

  getTags = (req: Request, res: Response, next: NextFunction) => {
    this.Tag.findAll()
      .then((response: any) => {
        res.status(201).json({ tags: response })
      })
      .catch((err: any) => {
        res.json({ error: "an error occured" })
      })
  }

  deleteTag = (req: Request, res: Response, next: NextFunction) => {
    let id: number = req.body.id;
    this.Tag.destroy({
      where: { id: id }
    })
      .then((response: any) => {
        res.status(200).json({ message: "tag deleted" })
      })
      .catch((err: any) => {
        res.json({ error: "an error ocurred" })
      })
  }

  editTag = (req: Request, res: Response, next: NextFunction) => {
    let values = {
      tag: req.body.title,
    };
    let selector = { where: { id: req.params.id } };
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
      .catch((err: any) => {
        console.log(err)
        res.status(500).json({ error: { message: err } })
      });
  }

  getArticlesByTag = (req: Request, res: Response, next: NextFunction) => {
    this.BlogPost.findAll({ where: { tags: req.params.tags } })
      .then((response: any) => {
        res.status(201).json({ articles: response })
      })
      .catch((err: any) => {
        res.json({ error: "an error occured" })
      })
  }
}
export default TagsController;