import { nanoid } from "nanoid";
import connection from "../db";

async function shortenUrl(req, res) {
    const { url } = res.locals;

    const shortUrl = nanoid();

    await connection.query(`
        insert into urls (url, short_url)
        values ($1, $2)
    `, [url, shortUrl]);

    res.status(201).send({ shortUrl });
};

export default shortenUrl;