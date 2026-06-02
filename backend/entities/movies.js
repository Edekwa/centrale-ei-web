import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    title: {
      type: String,
      unique: true,
    },
    release_date: { type: String },
    original_language: { type: String },
    overview: { type: String },
    vote_average: { type: Number },
    poster_path: { type: String },
    genre_id: { type: 'simple-json' },
  },
});

export default Movie;
