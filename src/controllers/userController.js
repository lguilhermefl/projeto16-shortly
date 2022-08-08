import { nanoid } from "nanoid";
import sanitizeString from "../utils/sanitizeStrings.js";
import userRepository from '../repositories/userRepository.js';

async function shortenUrl(req, res) {
    const { user } = res.locals;
    const url = sanitizeString(req.body.url);
    const shortUrl = nanoid(8);

    try {
        const { rowCount: shortUrlFound } = await userRepository.getShortUrlRegistry(shortUrl);

        if (shortUrlFound !== 0) {
            return res.status(409).send("Try again, we had a problem generating your short url!");
        };

        await userRepository.registerUrl(user.id, url, shortUrl);

        res.status(201).send({ shortUrl });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

async function getUrl(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).send("Url id must be a number!");
    };

    try {
        const { rows: urlInfo, rowCount: urlFound } = await userRepository.getUrlInfo(id);

        if (urlFound === 0) {
            return res.sendStatus(404);
        };

        res.send(urlInfo[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

async function redirectToLink(req, res) {
    const shortUrl = sanitizeString(req.params.shortUrl);

    try {
        const { rows: urlInfo, rowCount: urlFound } = await userRepository.getShortUrlRegistry(shortUrl);

        if (urlFound === 0) {
            return res.sendStatus(404);
        };

        const { id, url } = urlInfo[0];

        await userRepository.updateUrlVisits(id);

        res.redirect(url);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

async function deleteUrl(req, res) {
    const { user } = res.locals;
    const { id: urlId } = req.params;

    if (isNaN(urlId)) {
        return res.status(400).send("Url id must be a number!");
    };

    try {
        const { rowCount: existsShortenedUrl } = await userRepository.getShortUrlById(urlId);

        if (existsShortenedUrl === 0) {
            return res.sendStatus(404);
        };

        const { rowCount: isUrlFromUser } = await userRepository.getUrlIfCreatedByUser(user.id, urlId);

        if (isUrlFromUser === 0) {
            return res.sendStatus(401);
        };

        await userRepository.deleteUrl(urlId);

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

async function getUserData(req, res) {
    const { user } = res.locals;

    try {
        const { rows: userData, rowCount: existsUser } = await userRepository.getUserData(user.id);

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
        const { rows: ranking } = await userRepository.getRanking();

        res.send(ranking);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export { shortenUrl, getUrl, redirectToLink, deleteUrl, getUserData, getRanking };