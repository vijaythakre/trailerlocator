import axios from 'axios'; 
import winston from 'winston';

async function getTrailerUrl(movieSrc) {
    const movieImdbId = await getMovieImdbId(movieSrc);
    const movieTmdbId = await getMovieTmdbId(movieImdbId);
    const videoDetails = await getMovieVideoDetails(movieTmdbId);
    const trailerURL = frameTrailerURL(videoDetails);    
    return trailerURL;
}

// given viaplay movie-source get IMDB_ID for the movie
async function getMovieImdbId(url) {
    try {
        const response = await axios.get(url);
        const movieImdbId = response.data._embedded['viaplay:blocks'][0]['_embedded']['viaplay:product']['content']['imdb'].id;
        return movieImdbId;
    } catch (err) {
        winston.error(err.message);
        throw new Error(`Failed to get IMDB_ID for given Movie source.`);
    }
}

// given IMDB_ID for a movie get TMDB_ID for the movie from TMDB Database
async function getMovieTmdbId(movieImdbId) {
    const url = `https://api.themoviedb.org/3/find/${movieImdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US&external_source=imdb_id`
    try {
        const response = await axios.get(url);
        const movieTmdbId = response.data.movie_results[0].id;
        return movieTmdbId;
    } catch (err) {
        winston.error(err.message, err);
        throw new Error(`Failed to get TMDB_ID for given IMDB_ID of Movie.`);
    }
}

// given TMDB_ID for a movie get Video-Details from TMDB database
async function getMovieVideoDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        // winston.error(err.message);
        throw new Error(`Failed to get Video-Details for given TMDB_ID of Movie.`);
    }
}

// frame YouTube Trailer URL from given video-details of a movie
function frameTrailerURL(videoDetails) {
    try {
        const trailerDetails = videoDetails.results.find(v => (v.site == 'YouTube' && v.type == 'Trailer' && v.official == true));
        let trailerURL = `https://youtube.com/watch?v=${trailerDetails.key}`;
        return trailerURL;
    } catch (err) {
        // winston.error(err.message);
        throw new Error(`Failed to frame YouTube Trailer URL from Video-Details provided.`);
    }
}

export { 
    getTrailerUrl,
    getMovieImdbId,
    getMovieTmdbId,
    getMovieVideoDetails,
    frameTrailerURL
};
