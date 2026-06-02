/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const TMDB_BEARER =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo';
const MAX_PAGES = parseInt(process.env.SEED_MAX_PAGES || '10', 10);
const LOCAL_BASE = process.env.LOCAL_BASE || 'http://localhost:8000';

if (!TMDB_BEARER) {
  console.error('Set TMDB_BEARER in environment before running the script.');
  process.exit(1);
}

async function fetchPage(page = 1) {
  return axios.request({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/now_playing',
    params: { language: 'fr-FR', page: String(page) },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_BEARER}`,
    },
  });
}

async function postAllSequential(movies) {
  for (const m of movies) {
    try {
      const body = {
        title: m.title,
        release_date: m.release_date,
        original_language: m.original_language,
        overview: m.overview,
        vote_average: m.vote_average,
        poster_path: m.poster_path,
        // send the full array — backend expects genre_id field (simple-json), so we put the array there
        genre_id: Array.isArray(m.genre_ids) ? m.genre_ids : m.genre_id || null,
      };
      const response = await axios.post(`${LOCAL_BASE}/movies/new`, body, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Added', m.title, response.status);
    } catch (err) {
      console.error('Failed', m.title, err.response?.status || err.message);
    }
  }
}

async function main() {
  try {
    const first = await fetchPage(1);
    const totalPages = Math.min(first.data.total_pages || 1, MAX_PAGES);
    const allResults = [...(first.data.results || [])];

    for (let p = 2; p <= totalPages; p++) {
      const res = await fetchPage(p);
      allResults.push(...(res.data.results || []));
    }

    // map to shape we use when posting
    const tempMovies = allResults.map((movie) => ({
      title: movie.title,
      release_date: movie.release_date,
      original_language: movie.original_language,
      overview: movie.overview,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      genre_ids: movie.genre_ids, // keep full array here
    }));

    console.log(
      `Fetched ${tempMovies.length} movies from TMDB (pages 1..${totalPages})`
    );
    await postAllSequential(tempMovies);
    console.log('Done.');
  } catch (err) {
    console.error('Error in main:', err);
    process.exit(1);
  }
}

main();
