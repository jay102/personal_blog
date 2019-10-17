import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();
import bodyParser from 'body-parser';
const db = require('./database/config/config');
const port = process.env.PORT || 4000;

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// import routes
import Admin from './routes/admin'
import BlogPosts from './routes/blogpost'
import Tags from './routes/tags'

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

//test db
db.authenticate()
    .then(() => console.log("Database Connected Successfully"))
    .catch((err: string) => console.log("Error :" + err));


export const server = app.listen(port, () => {
    console.log(`Connected to port ${port}`)
})
module.exports = app;