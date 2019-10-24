import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();
import bodyParser from 'body-parser';
const db = require('./database/config/config');
const port = process.env.PORT || 4000;
const path = require('path');

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './client/build')));

// import routes
import Admin from './routes/admin';
import BlogPosts from './routes/blogpost';
import Tags from './routes/tags';
import Media from './routes/media';

// static folders
app.use(express.static('uploads'))

//setup headers to handle cors error
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }
    next();
});

//setup routes
app.use('/admin', Admin);
app.use('/posts', BlogPosts);
app.use('/tags', Tags);
app.use('/media', Media);

// serve static assets if in production
if (process.env.NODE_ENV !== 'development') {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//test db
db.authenticate()
    .then(() => console.log("Database Connected Successfully"))
    .catch((err: string) => console.log("Error :" + err));


export const server = app.listen(port, () => {
    console.log(`Connected to port ${port}`)
})
module.exports = app;