import connection from "../db.js";

async function getUserRegistryByEmail(email) {
    return connection.query(`
        select *
        from users
        where email=$1;
    `, [email]);
};

async function signUpUser(name, email, passwordHash) {
    connection.query(`
        insert into users (name, email, password)
        values ($1, $2, $3);
    `, [name, email, passwordHash]);
};

async function createUserSession(id, token) {
    connection.query(`
        insert into sessions (user_id, token)
        values ($1, $2);
    `, [id, token]);
};

async function getUserSession(token) {
    return connection.query(`
        select *
        from sessions
        where token=$1;
    `, [token]);
};

async function getUserById(id) {
    return connection.query(`
        select *
        from users
        where id=$1;
    `, [id]);
};

const authRepository = {
    getUserRegistryByEmail,
    signUpUser,
    createUserSession,
    getUserSession,
    getUserById
};

export default authRepository;