import { Router } from 'express';

const userRouter = Router();

userRouter.post('/urls/shorten');
userRouter.get('/urls/:id');
userRouter.delete('/urls/:id');
userRouter.get('/urls/open/:shortUrl');
userRouter.get('/users/me');
userRouter.get('/ranking');

export default userRouter;