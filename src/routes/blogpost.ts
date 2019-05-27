import express, { Request, Response, NextFunction } from 'express'

const router = express.Router();



router.post('/post', (req: Request, res: Response, next: NextFunction) => {
    res.send("Success from server")
})

export default router;