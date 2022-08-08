import authRepository from '../repositories/authRepository.js';

async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.sendStatus(401);
    };

    const { rows: session } = await authRepository.getUserSession(token);

    if (!session) {
        return res.sendStatus(401);
    };

    const { user_id: userId } = session[0];

    const { rows: user } = await authRepository.getUserById(userId);

    if (!user) {
        return res.sendStatus(401);
    };

    res.locals.user = user[0];
    next();
};

export default validateToken;