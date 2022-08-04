import urlSchema from "../schemas/userSchemas";
import sanitizeString from "../utils/sanitizeStrings";

async function validateUrl(req, res, next) {
    const validation = urlSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errorMessages = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errorMessages);
    };

    const url = sanitizeString(req.body.url);

    res.locals.url = url;

    next();
};

export default validateUrl;