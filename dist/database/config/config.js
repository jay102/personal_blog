"use strict";
const Sequelize = require('sequelize');
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
let db;
if (env === "test") {
    db = new Sequelize('jaycodes_test', 'postgres', '123ifeco', {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
}
else if (env === "development") {
    db = new Sequelize('jaycodes', 'postgres', '123ifeco', {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
}
else if (env === "production") {
    db = new Sequelize(`${process.env.DATABASE_URL}`, {
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
}
module.exports = db;
