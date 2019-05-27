import express, { Request, Response, NextFunction } from 'express'
const router = express.Router();
import Admin from '../../database/models/Admin'
import postController from '../controllers/postController'
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


//Login route
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    let password: String = req.body.password;
    let id: any = 1;

    Admin.findOne({
        where: {
            id: id
        }
    }).then((user: any) => {
        if (!user) {
            res.status(404).json({ error: "Incorrect id." });
        }
        bcrypt.compare(password, user.password, function (err: any, response: any) {
            if (!response) {
                res.status(404).json({ error: "Incorrect password." });
            } else {
                res.status(200).json({ message: "success." });
            }
        });
    }).catch((err: any) => res.status(401).json({ error: err }));
})

//Post Password to Db
router.post('/:password', (req: Request, res: Response, next: NextFunction) => {
    let password: String = req.params.password;
    let hash: String = bcrypt.hashSync(password, salt);
    Admin.create({
        password: hash
    }).then((response: String) => {
        res.status(200).json({
            message: "Admin password added",
            response: response
        })
    }).catch((err: String) => {
        res.status(401).json({
            error: err
        })
    });
})

//Create Blogpost
router.post('/new-post', postController)



export default router;