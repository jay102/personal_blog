"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
class AdminController {
    constructor(Admin) {
        // get admin
        this.details = (req, res, next) => {
            this.Admin.findOne({
                where: { id: req.params.id },
                attributes: ['image']
            })
                .then((response) => {
                res.status(201).json({ admin: response });
            })
                .catch((err) => {
                res.json({ err: err });
            });
        };
        // login
        this.login = (req, res, next) => {
            let password = req.body.password;
            let id = 1;
            this.Admin.findOne({
                where: {
                    id: id
                }
            }).then((user) => {
                if (!user) {
                    return res.status(404).json({ error: "Incorrect id." });
                }
                bcrypt.compare(password, user.password, function (err, response) {
                    if (!response) {
                        return res.status(404).json({ error: "Incorrect password." });
                    }
                    else {
                        return res.status(201).json({ message: "success", user_id: user.id });
                    }
                });
            }).catch((err) => res.status(401).json({ error: err }));
        };
        //Post Password to Db
        this.postPassword = (req, res, next) => {
            let password = req.params.password;
            let hash = bcrypt.hashSync(password, salt);
            this.Admin.create({
                password: hash
            }).then((response) => {
                return res.status(200).json({
                    message: "this.Admin password added",
                    response: response
                });
            }).catch((err) => {
                return res.status(401).json({
                    error: err
                });
            });
        };
        // upload image
        this.updateImage = (req, res, next) => {
            let img;
            const { file } = req;
            if (file) {
                img = file.filename;
            }
            let values = {
                image: img,
            };
            let selector = { where: { id: req.params.id } };
            this.Admin.update(values, selector)
                .then((result) => {
                console.log(result);
                if (result[0] === 1) {
                    return res.status(200).json({
                        message: "Admin image updated Successfully"
                    });
                }
                else {
                    return res.status(401).json({
                        error: {
                            message: "Could not Edit Image"
                        }
                    });
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ error: { message: err } });
            });
        };
        this.Admin = Admin;
    }
}
exports.default = AdminController;
