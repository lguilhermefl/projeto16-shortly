import { signUpSchema } from '../schemas/authSchemas.js';
import sanitizeString from '../utils/sanitizeStrings.js';

async function validateSignUp(req, res, next) {
    const validation = signUpSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errorMessages = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errorMessages);
    };

    const user = {
        name: sanitizeString(req.body.name),
        email: sanitizeString(req.body.email),
        password: sanitizeString(req.body.password)
    };

    res.locals.user = user;

    next();
};

export default validateSignUp;