import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../db';

async function signUp(req, res) {
    const user = req.body;
};