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

const authRepository = {
    getUserRegistryByEmail,
    signUpUser,
    createUserSession
};

export default authRepository;