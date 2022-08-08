import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../db.js';
import sanitizeString from '../utils/sanitizeStrings.js';

async function signUp(req, res) {
    const user = {
        name: sanitizeString(req.body.name),
        email: sanitizeString(req.body.email),
        password: sanitizeString(req.body.password)
    };
    const { name, email, password } = user;

    const { rowCount: emailRegistered } = await connection.query(`
        select *
        from users
        where email=$1;
    `, [email]);

    if (emailRegistered !== 0) {
        return res.sendStatus(409);
    };

    const passwordHash = bcrypt.hashSync(password, 10);

    await connection.query(`
        insert into users (name, email, password)
        values ($1, $2, $3);
    `, [name, email, passwordHash]);

    res.sendStatus(201);
};

async function signIn(req, res) {
    const user = {
        email: sanitizeString(req.body.email),
        password: sanitizeString(req.body.password)
    };
    const { email, password } = user;

    const { rows: userRegistered, rowCount: userCount } = await connection.query(`
        select *
        from users
        where email=$1;
    `, [email]);

    if (userCount === 0) {
        return res.sendStatus(401);
    };

    const { id, password: passwordHash } = userRegistered[0];

    if (bcrypt.compareSync(password, passwordHash)) {
        const token = uuid();

        await connection.query(`
            insert into sessions (user_id, token)
            values ($1, $2);
        `, [id, token]);

        res.status(200).send({ token });
    } else {
        res.sendStatus(401);
    };
};

export { signUp, signIn };