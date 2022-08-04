import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../db';

async function signUp(req, res) {
    const { user } = res.locals;
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
        values ($1, $2, $3)
    `, [name, email, passwordHash]);

    res.sendStatus(201);
};