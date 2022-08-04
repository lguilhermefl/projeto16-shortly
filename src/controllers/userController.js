import { nanoid } from "nanoid";
import connection from "../db";

async function shortenUrl(req, res) {
    const { user, url } = res.locals;

    const shortUrl = nanoid();

    await connection.query(`
        insert into urls (user_id, url, short_url)
        values ($1, $2, $3);
    `, [user.id, url, shortUrl]);

    res.status(201).send({ shortUrl });
};

async function getUrl(req, res) {
    const { id } = req.params;

    const { rows: urlInfo, rowCount: urlFound } = await connection.query(`
        select id, short_url as "shortUrl", url
        from urls
        where id=$1;
    `, [id]);

    if (urlFound === 0) {
        return res.sendStatus(404);
    };

    res.send(urlInfo);
};

export { shortenUrl, getUrl };