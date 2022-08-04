import connection from '../db.js'
import sanitizeString from '../utils/sanitizeStrings.js';

async function validateToken(req, res, next) {
    const authorization = sanitizeString(req.headers.authorization);
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.sendStatus(401);
    };

    const { rows: session } = connection.query(`
        select *
        from sessions
        where token=$1;
    `, [token]);

    if (!session) {
        return res.sendStatus(401);
    };

    const { rows: user } = connection.query(`
        select *
        from users
        where id=$1;
    `, [session.user_id]);

    if (!user) {
        return res.sendStatus(401);
    };

    res.locals.user = user;
    next();
};

export default validateToken;