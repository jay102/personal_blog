"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db = require("../config/config");
const Tags = db.define("tag", {
    tag: {
        type: Sequelize.STRING,
        allowNull: false
    },
    class: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
exports.default = Tags;
