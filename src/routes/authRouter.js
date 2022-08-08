import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import validateSchema from '../middlewares/schemasValidationMiddleware.js';

const authRouter = Router();

authRouter.use(validateSchema);
authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);

export default authRouter;