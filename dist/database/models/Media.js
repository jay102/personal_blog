"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db = require("../config/config");
const Media = db.define("media", {
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    publicId: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    freezetablename: true
});
exports.default = Media;
