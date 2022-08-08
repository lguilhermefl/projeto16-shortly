import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import urlSchema from "../schemas/userSchemas.js";

async function validateSchema(req, res, next) {
    const { url, method } = req;
    let validation;

    if (url === "/signup" && method === "POST") {
        validation = signUpSchema.validate(req.body, { abortEarly: false });
    };

    if (url === "/signin" && method === "POST") {
        validation = signInSchema.validate(req.body, { abortEarly: false });
    };

    if (url === "/urls/shorten" && method === "POST") {
        validation = urlSchema.validate(req.body, { abortEarly: false });
    };

    if (validation?.error) {
        const errorMessages = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errorMessages);
    };

    next();
};

export default validateSchema;