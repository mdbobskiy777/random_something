import { gql } from '@apollo/client';

export type Movie = {
  name: string
};

export type Movies = {
  movies: Movie[]
};

export type MovieInfoType = {
  id: string,
  name: string,
  director: {
    name: string
  }
};

export const MOVIE = gql`
query Movie ($name: String! ){
  movie(name: $name) {
    id
    name
    directorId
    director {
      name
    }
  }
}`;

export const MOVIES = gql`
  query GetMovies {
    movies {
      name
    }
  }
`;
