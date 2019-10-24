"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MediaController {
    constructor(Media, middlewares) {
        this.Media = Media;
        this.getAllMedia = (req, res, next) => {
            this.Media.findAll()
                .then((result) => {
                return res.status(200).json({ allmedia: result });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.deleteMedia = (req, res, next) => {
            const id = req.body.id;
            const outer = this;
            this.cloudinary.v2.uploader
                .destroy(id, (error, result) => {
                if (result.result === "ok") {
                    outer.Media.destroy({
                        where: { publicId: id }
                    }).then((result) => {
                        res.status(200).json(result);
                    });
                }
                else {
                    res.status(200).json(result);
                }
            });
        };
        this.addMedia = (req, res, next) => {
            const { file } = req;
            if (file) {
                this.Media.create({
                    url: file.url,
                    publicId: file.public_id,
                }).then((result) => {
                    return res.status(200).json({ "data": { "url": file.url } });
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                return res.status(400).json({ "error": 400 });
            }
        };
        this.Media = Media;
        const { cloudinary } = middlewares;
        Object.assign(this, middlewares);
    }
}
exports.default = MediaController;
