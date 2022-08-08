import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import sanitizeString from '../utils/sanitizeStrings.js';
import authRepository from '../repositories/authRepository.js';

async function signUp(req, res) {
    const user = {
        name: sanitizeString(req.body.name),
        email: sanitizeString(req.body.email),
        password: sanitizeString(req.body.password)
    };
    const { name, email, password } = user;

    try {
        const { rowCount: userCount } = await authRepository.getUserRegistryByEmail(email);

        if (userCount !== 0) {
            return res.sendStatus(409);
        };

        const passwordHash = bcrypt.hashSync(password, 10);

        await authRepository.signUpUser(name, email, passwordHash);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

async function signIn(req, res) {
    const user = {
        email: sanitizeString(req.body.email),
        password: sanitizeString(req.body.password)
    };
    const { email, password } = user;

    try {
        const { rows: userRegistered, rowCount: userCount } = await authRepository.getUserRegistryByEmail(email);

        if (userCount === 0) {
            return res.sendStatus(401);
        };

        const { id, password: passwordHash } = userRegistered[0];

        if (bcrypt.compareSync(password, passwordHash)) {
            const token = uuid();

            await authRepository.createUserSession(id, token);

            res.status(200).send({ token });
        } else {
            res.sendStatus(401);
        };
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export { signUp, signIn };