import express from 'express';

const router = express.Router();

import { getTrailerUrl } from './movieServices.js';

router.get('/status-check', async (req, res, next) => {
    res.send(`Ok`);
})

router.get('/api/get-trailer-url', async (req, res) => {
    const movieSrc = req.query.movieSrc
    if (!movieSrc) {
        res.status(400).send(`movieSrc is required`);
    }
    try {
        const trailerURL = await getTrailerUrl(movieSrc);
        res.send({ trailerURL })
    } catch(err) {
        res.status(500).send(err.message || `Something went wrong on server.`)
    }
})

export default router; 