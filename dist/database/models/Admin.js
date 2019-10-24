"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db = require("../config/config");
const Admin = db.define("admin", {
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});
exports.default = Admin;
