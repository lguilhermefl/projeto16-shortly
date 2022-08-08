import connection from "../db.js";

async function getShortUrlRegistry(shortUrl) {
    return connection.query(`
        select *
        from urls
        where short_url=$1;
    `, [shortUrl]);
};

async function registerUrl(userId, url, shortUrl) {
    connection.query(`
        insert into urls (user_id, url, short_url)
        values ($1, $2, $3);
    `, [userId, url, shortUrl]);
};

async function getUrlInfo(id) {
    return connection.query(`
        select id, short_url as "shortUrl", url
        from urls
        where id=$1;
    `, [id]);
};

async function updateUrlVisits(id) {
    connection.query(`
        update urls
        set visits=visits+1
        where id=$1;
    `, [id]);
};

async function getShortUrlById(id) {
    return connection.query(`
        select short_url
        from urls
        where id=$1;
    `, [id]);
};

async function getUrlIfCreatedByUser(userId, urlId) {
    return connection.query(`
        select *
        from urls
        where user_id=$1 and id=$2;
    `, [userId, urlId]);
};

async function deleteUrl(id) {
    connection.query(`
        delete from urls
        where id=$1;
    `, [id]);
};

async function getUserData(userId) {
    return connection.query(`
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
    `, [userId]);
};

async function getRanking() {
    return connection.query(`
        select users.id, users.name, count(urls.user_id) as "linksCount", coalesce(sum(urls.visits), 0) as "visitCount"
        from users
        left join urls
        on urls.user_id=users.id
        group by users.id
        order by "visitCount" desc, users.id asc
        limit 10;
    `);
};

const userRepository = {
    getShortUrlRegistry,
    registerUrl,
    getUrlInfo,
    updateUrlVisits,
    getShortUrlById,
    getUrlIfCreatedByUser,
    deleteUrl,
    getUserData,
    getRanking
};

export default userRepository;