import logo from './logo.svg';
import './Home.css';
import { useFetchMovies } from './useFetchMovies';
import Movie from '../../components/Movies/Movie.jsx';

function Home() {
  // eslint-disable-next-line no-unused-vars
  const { movies, moviesLoadingError, fetchMovies } = useFetchMovies();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Movie movies={movies} />
        {moviesLoadingError !== null && (
          <div className="users-loading-error">{moviesLoadingError}</div>
        )}
        <a
          className="App-link"
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
