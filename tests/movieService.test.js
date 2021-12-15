import { getMovieImdbId, getMovieTmdbId, getMovieVideoDetails, frameTrailerURL } from '../movieServices.js';

import axios from "axios";
jest.mock("axios");

describe('MOVIE SERVICES', () => {

    describe('getMovieImdbId', () => {
        it('should request movieSrcURL to get movie data', async () => {
            const viaPlayMovieSrc = 'https://content.viaplay.se/pc-se/film/focus-2015';
            const movieImdbId = 'tt2381941';
            const viaplayMovieData = { data: { _embedded: { "viaplay:blocks": [ { _embedded: { 'viaplay:product': { 'content': { 'imdb': { 'id': movieImdbId } } } } } ] } } };

            axios.get.mockResolvedValueOnce(viaplayMovieData);

            const result = await getMovieImdbId(viaPlayMovieSrc);

            expect(axios.get).toHaveBeenCalledWith(viaPlayMovieSrc);
            expect(result).toEqual(movieImdbId);            
        });
    });

    describe('getMovieTmdbId', () => {
        it('should request TMDB API to get movie data for given IMDB MOVIE_ID', async () => {
            const movieImdbId = 'tt2381941';
            const tmdbReqURL = `https://api.themoviedb.org/3/find/${movieImdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US&external_source=imdb_id`;
            const tmdbMovieData = { data: { movie_results: [ { id: '256591' } ] } };

            axios.get.mockResolvedValueOnce(tmdbMovieData);

            const result = await getMovieTmdbId(movieImdbId);
            
            expect(axios.get).toHaveBeenCalledWith(tmdbReqURL);
            expect(result).toEqual(tmdbMovieData.data.movie_results[0].id);            
        });
    });
    
    describe('getMovieVideoDetails', () => {
        it('should request TMDB API to get movie video-details for given TMDB MOVIE_ID', async () => {
            const movieTmdbId = '256591';
            const tmdbVideoReqURL = `https://api.themoviedb.org/3/movie/${movieTmdbId}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
            const tmdbMovieVideoDetails = { data: { "id": 256591, "results": [ { "key": "6vY9UPiI4eQ", "site": "YouTube", "type": "Trailer", "official": true } ] } };

            axios.get.mockResolvedValueOnce(tmdbMovieVideoDetails);

            const result = await getMovieVideoDetails(movieTmdbId);
            
            expect(axios.get).toHaveBeenCalledWith(tmdbVideoReqURL);
            expect(result).toEqual(tmdbMovieVideoDetails.data);            
        });
    })

    const videoDetails = {
        "id": 256591,
        "results": [
            {
                "key": "6vY9UPiI4eQ",
                "site": "YouTube",
                "type": "Trailer",
                "official": true
            },
            {
                "key": "btI7yHxn1NU",
                "site": "MeTube",
                "type": "Trailer",
            },
            {
                "key": "A1PqBFHoeTA",
                "site": "YouTube",
                "type": "Short Clips",
                "official": true,
            }
        ]
    };
    describe('frameTrailerURL', () => {
        it('should frame YouTube video URL correctly using videoDetails', () => {
            
            const trailerURL = `https://youtube.com/watch?v=${videoDetails.results[0].key}`;
            expect(frameTrailerURL(videoDetails)).toBe(trailerURL);
        });
    });  
});
