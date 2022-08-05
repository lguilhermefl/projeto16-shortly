import { nanoid } from "nanoid";
import connection from "../db";
import sanitizeString from "../utils/sanitizeStrings";

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

    delete urlInfo.user_id;
    delete urlInfo.visits;
    delete urlInfo.created_at;

    res.send(urlInfo);
};

async function redirectToLink(req, res) {
    const shortUrl = sanitizeString(req.params.shortUrl);

    const { rows: originalUrl, rowCount: urlFound } = await connection.query(`
        select url
        from urls
        where short_url=$1;
    `, [shortUrl]);

    if (urlFound === 0) {
        return res.sendStatus(404);
    };

    await connection.query(`
        update urls
        set visits=visits+1
        where short_url=$1;
    `, [shortUrl]);

    const { url } = originalUrl;

    res.redirect(url);
};

async function deleteUrl(req, res) {
    const { user } = res.locals;
    const { id: urlId } = req.params;

    const { rowCount: existsShortenedUrl } = await connection.query(`
        select short_url
        from urls
        where id=$1;
    `, [urlId]);

    if (existsShortenedUrl === 0) {
        return res.sendStatus(404);
    };

    const { rowCount: isUrlFromUser } = await connection.query(`
        select *
        from urls
        where user_id=$1 and id=$2;
    `, [user.id, urlId]);

    if (isUrlFromUser === 0) {
        return res.sendStatus(401);
    };

    await connection.query(`
        delete from urls
        where id=$1;
    `, [urlId]);

    res.sendStatus(201);
};

async function getUserData(req, res) {
    const { user } = res.locals;
};

export { shortenUrl, getUrl, redirectToLink, deleteUrl };