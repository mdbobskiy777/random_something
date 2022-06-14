import { useParams } from 'react-router';

import { useQuery } from '@apollo/client';

import { MOVIE, MovieInfoType } from 'src/grapgql/queries';

import { NotFoundAsset } from 'src/pages/errors/NotFoundAsset';

const MovieOverview = () => {
  const { name } = useParams<{ name: string }>();

  const {
    loading,
    error,
    data,
  } = useQuery<{ movie: MovieInfoType }>(
    MOVIE,
    { variables: { name } },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {
        data?.movie ? (
          <div>
            <div>{data.movie.name}</div>
            <div>{data.movie.director.name}</div>
          </div>
        )
          : <NotFoundAsset />
      }
    </div>
  );
};

export default MovieOverview;
