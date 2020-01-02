import { Request, Response, NextFunction, response } from 'express';
class usersController {
  constructor(private User: any, private Media: any) {
    this.User = User;
  }

  getUsers = (req: Request, res: Response, next: NextFunction) => {
    this.User.findAll()
      .then((response: string) => {
        return res.status(200).json({
          users: response
        })
      })
      .catch((err: string) => {
        res.json({ error: "an error occured" })
      })
  }

  addUser = (req: Request, res: Response, next: NextFunction) => {

    this.User.create(req.body)
      .then((response: string) => {
        return res.status(201).json({
          message: "user created!"
        })
      }).catch((err: string) => {
        return res.status(400).json({ error: err })
      })
  }
  editUser = (req: Request, res: Response, next: NextFunction) => {
    let values = {
      username: req.body.username,
      password: req.body.password,
    };
    let selector = { where: { id: req.body.username } };
    this.User.update(values, selector)
      .then((result: any) => {
        if (result[0] === 1) {
          return res.status(200).json({
            message: "User Edited Successfully"
          });
        } else {
          return res.json({
            error: {
              message: "Could not Edit user"
            }
          });
        }
      })
      .catch((err: string) => {
        console.log(err)
        return res.status(500).json({ error: { message: err } })
      });
  }
  deleteUser = (req: Request, res: Response, next: NextFunction) => {
    this.User.destroy({
      where: { username: req.body.username }
    })
      .then((response: any) => {
        res.status(200).json({ message: "user deleted" })
      })
      .catch((err: string) => {
        res.json({ error: err })
      })
  }
  uploadUserImage = (req: Request, res: Response, next: NextFunction) => {
    const { file } = (<any>req);
    const self = this;
    if (file) {
      this.Media.create({
        url: file.url,
        publicId: file.public_id,
      }).then((result: any) => {
        let values = {
          image: file.url,
        };
        let selector = { where: { id: req.body.username } };
        self.User.update(values, selector).then((result: any) => {
          return res.status(201).json({ "data": { "url": file.url } })
        })

      }).catch((err: string) => {
        console.log(err);
      })
    } else {
      return res.status(400).json({ "error": 400 })
    }
  }
}
export default usersController;