import { nanoid } from "nanoid";
import connection from "../db.js";
import sanitizeString from "../utils/sanitizeStrings.js";

async function shortenUrl(req, res) {
    const { user } = res.locals;
    const url = sanitizeString(req.body.url);
    const shortUrl = nanoid(8);

    try {
        const { rowCount: shortUrlFound } = await connection.query(`
            select *
            from urls
            where short_url=$1;
        `, [shortUrl]);

        if (shortUrlFound !== 0) {
            return res.status(409).send("Try again, we had a problem generating your short url!");
        };

        await connection.query(`
            insert into urls (user_id, url, short_url)
            values ($1, $2, $3);
        `, [user.id, url, shortUrl]);

        res.status(201).send({ shortUrl });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

async function getUrl(req, res) {
    const { id } = req.params;

    try {
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

        res.send(urlInfo[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

async function redirectToLink(req, res) {
    const shortUrl = sanitizeString(req.params.shortUrl);

    try {
        const { rows: urlInfo, rowCount: urlFound } = await connection.query(`
            select *
            from urls
            where short_url=$1;
        `, [shortUrl]);

        if (urlFound === 0) {
            return res.sendStatus(404);
        };

        const { id, url } = urlInfo[0];

        await connection.query(`
            update urls
            set visits=visits+1
            where id=$1;
        `, [id]);

        res.redirect(url);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

async function deleteUrl(req, res) {
    const { user } = res.locals;
    const { id: urlId } = req.params;

    try {
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
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

async function getUserData(req, res) {
    const { user } = res.locals;

    try {
        const { rows: userData, rowCount: existsUser } = await connection.query(`
            select users.id, users.name, sum(urls.visits) as "visitCount",
                jsonb_agg(
                    json_build_object(
                        'id', urls.id, 'shortUrl', urls.short_url, 'url', urls.url,
                        'visitCount', urls.visits
                    ) order by urls.id
                ) as "shortenedUrls"
            from users
            join urls
            on urls.user_id=users.id
            where users.id=$1
            group by users.id;
        `, [user.id]);

        if (existsUser === 0) {
            return res.sendStatus(404);
        };

        const userDataObject = userData[0];

        res.status(200).send(userDataObject);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

async function getRanking(req, res) {
    try {
        const { rows: ranking } = await connection.query(`
            select users.id, users.name, count(urls.user_id) as "linksCount", coalesce(sum(urls.visits), 0) as "visitCount"
            from users
            left join urls
            on urls.user_id=users.id
            group by users.id
            order by "visitCount"
            desc
            limit 10;
        `);

        res.send(ranking);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export { shortenUrl, getUrl, redirectToLink, deleteUrl, getUserData, getRanking };