import { Router } from 'express';
import { shortenUrl, getUrl } from '../controllers/userController.js';
import validateToken from '../middlewares/tokenValidationMiddleware.js'

const userRouter = Router();

userRouter.post('/urls/shorten', validateToken, shortenUrl);
userRouter.get('/urls/:id', getUrl);
userRouter.delete('/urls/:id');
userRouter.get('/urls/open/:shortUrl');
userRouter.get('/users/me');
userRouter.get('/ranking');

export default userRouter;