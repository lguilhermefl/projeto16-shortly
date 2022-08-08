import connection from '../db.js'

async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.sendStatus(401);
    };

    const { rows: session } = await connection.query(`
        select *
        from sessions
        where token=$1;
    `, [token]);

    if (!session) {
        return res.sendStatus(401);
    };

    const { user_id: userId } = session[0];

    const { rows: user } = await connection.query(`
        select *
        from users
        where id=$1;
    `, [userId]);

    if (!user) {
        return res.sendStatus(401);
    };

    res.locals.user = user[0];
    next();
};

export default validateToken;