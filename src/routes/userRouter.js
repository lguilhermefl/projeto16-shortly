import { Router } from 'express';
import { shortenUrl, getUrl, redirectToLink, deleteUrl, getUserData, getRanking } from '../controllers/userController.js';
import validateToken from '../middlewares/tokenValidationMiddleware.js'

const userRouter = Router();

userRouter.get('/urls/:id', getUrl);
userRouter.get('/urls/open/:shortUrl', redirectToLink);
userRouter.get('/ranking', getRanking);

userRouter.use(validateToken);
userRouter.post('/urls/shorten', shortenUrl);
userRouter.get('/users/me', getUserData);
userRouter.delete('/urls/:id', deleteUrl);

export default userRouter;