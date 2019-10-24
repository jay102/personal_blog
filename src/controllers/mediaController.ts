import { Request, Response, NextFunction } from 'express';

class MediaController {
  cloudinary: any;
  constructor(private Media?: any, middlewares?: any) {
    this.Media = Media;
    const { cloudinary } = middlewares;
    Object.assign(this, middlewares);
  }

  getAllMedia = (req: Request, res: Response, next: NextFunction) => {
    this.Media.findAll()
      .then((result: any) => {
        return res.status(200).json({ allmedia: result })
      }).catch((err: any) => {
        console.log(err)
      });

  }
  deleteMedia = (req: Request, res: Response, next: NextFunction) => {
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

  addMedia = (req: Request, res: Response, next: NextFunction) => {
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

}
export default MediaController;