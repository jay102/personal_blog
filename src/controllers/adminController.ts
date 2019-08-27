import { Request, Response, NextFunction } from 'express'
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

class AdminController {
  Admin: any;
  constructor(Admin: any) {
    this.Admin = Admin;
  }
  // login
  login = (req: Request, res: Response, next: NextFunction) => {
    let password: String = req.body.password;
    let id: number = 1;

    this.Admin.findOne({
      where: {
        id: id
      }
    }).then((user: any) => {
      if (!user) {
        return res.status(404).json({ error: "Incorrect id." });
      }
      bcrypt.compare(password, user.password, function (err: any, response: any) {
        if (!response) {
          return res.status(404).json({ error: "Incorrect password." });
        } else {
          return res.status(200).json({ message: "success.", user_id: user.id });
        }
      });
    }).catch((err: any) => res.status(401).json({ error: err }));
  }
  //Post Password to Db
  postPassword = (req: Request, res: Response, next: NextFunction) => {
    let password: String = req.params.password;
    let hash: String = bcrypt.hashSync(password, salt);
    this.Admin.create({
      password: hash
    }).then((response: String) => {
      return res.status(200).json({
        message: "this.Admin password added",
        response: response
      })
    }).catch((err: String) => {
      return res.status(401).json({
        error: err
      })
    });
  }
}
export default AdminController