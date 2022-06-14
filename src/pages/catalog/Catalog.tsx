import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { Movie, MOVIES, Movies } from 'src/grapgql/queries';

import { toKebabCase } from 'src/feature-logic';
import { CommonError } from 'src/pages/errors/CommonError';

const Catalog = () => {
  const { loading, error, data } = useQuery<Movies>(MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {
        data?.movies ? (
          data.movies.map((movie: Movie) => (
            <div key={movie.name}>
              <Link
                to={`/movie/${toKebabCase(movie.name)}`}
              >
                Movie: {movie.name}
              </Link>
            </div>
          ))) : <CommonError />
      }
    </div>
  );
};

export default Catalog;
