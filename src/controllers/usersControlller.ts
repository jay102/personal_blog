import { Request, Response, NextFunction } from 'express';
class usersController {
  constructor(private User: any) {
    this.User = User;
  }

  getUsers = (req: Request, res: Response, next: NextFunction) => {

  }

  addUser = (req: Request, res: Response, next: NextFunction) => {

  }
  editUser = (req: Request, res: Response, next: NextFunction) => {

  }
  deleteUser = (req: Request, res: Response, next: NextFunction) => {

  }
  uploadUserImage = (req: Request, res: Response, next: NextFunction) => {

  }
}
export default usersController;