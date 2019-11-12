"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const body_parser_1 = __importDefault(require("body-parser"));
const db = require('./database/config/config');
const port = process.env.PORT || 4000;
const path = require('path');
// body parser
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path.join(__dirname, '/../client/build')));
// import routes
const admin_1 = __importDefault(require("./routes/admin"));
const blogpost_1 = __importDefault(require("./routes/blogpost"));
const tags_1 = __importDefault(require("./routes/tags"));
const media_1 = __importDefault(require("./routes/media"));
// static folders
app.use(express_1.default.static('uploads'));
//setup headers to handle cors error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }
    next();
});
//setup routes
app.use('/admin', admin_1.default);
app.use('/posts', blogpost_1.default);
app.use('/tags', tags_1.default);
app.use('/media', media_1.default);
// // serve static assets if in production
// if (process.env.NODE_ENV !== 'development') {
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }
//test db
db.authenticate()
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log("Error :" + err));
exports.server = app.listen(port, () => {
    console.log(`Connected to port ${port}`);
});
module.exports = app;
