import './Movie.css';
const imagePath = 'https://image.tmdb.org/t/p/w220_and_h330_face/';

function Movie({ movies }) {
  return (
    <div>
      <table className="movie">
        <thead>
          <tr>
            <th></th>
            <th>
              TOP10 - MOST POPULAR MOVIES RIGHT NOW! ORDER YOUR TICKETS NOW!
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.title}>
              <td>
                <img
                  src={`${imagePath}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </td>
              <td>{movie.title}</td>
              <td>{movie.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Movie;
