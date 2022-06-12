const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} = require('graphql');
const cors = require('cors');

const endPoint = '/graphql';

const toKebabCase = (string) => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();

const directors = [
  { id: 1, name: 'Peter Jackson' },
  { id: 2, name: 'Michael Bay' },
  { id: 3, name: 'Steven Spielberg' },
  { id: 4, name: 'Christopher Nolan' },
  { id: 5, name: 'Quentin Tarantino' },
];

const movies = [
  { id: 1, name: 'The Lord of the Rings', directorId: 1 },
  { id: 2, name: 'King Kong', directorId: 1 },
  { id: 3, name: 'The Hobbit: An Unexpected Journey', directorId: 1 },
  { id: 4, name: 'The Hobbit: The Desolation of Smaug', directorId: 1 },
  { id: 5, name: 'The Hobbit: The Battle of the Five Armies', directorId: 1 },
  { id: 6, name: 'Armageddon', directorId: 2 },
  { id: 7, name: 'Pearl Harbor', directorId: 2 },
  { id: 8, name: 'Transformers', directorId: 2 },
  { id: 9, name: 'Jurassic Park ', directorId: 3 },
  { id: 10, name: 'Indiana Jones and the Kingdom of the Crystal Skull', directorId: 3 },
  { id: 11, name: 'Dunkirk', directorId: 4 },
  { id: 12, name: 'The Dark Knight Rises', directorId: 4 },
  { id: 13, name: 'Interstellar', directorId: 4 },
  { id: 14, name: 'Kill Bill: Volume 1', directorId: 5 },
  { id: 15, name: 'Inglourious Basterds', directorId: 5 },
  { id: 16, name: 'Django Unchained', directorId: 5 },
];

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  description: 'This represents a director of a movie',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'This represents a move directed by',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    directorId: { type: new GraphQLNonNull(GraphQLInt) },
    director: {
      type: DirectorType,
      resolve: (movie) => directors.find((director) => director.id === movie.directorId),
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    movies: {
      type: new GraphQLList(MovieType),
      description: 'List of all movies',
      resolve: () => movies,
    },
    directors: {
      type: new GraphQLList(DirectorType),
      description: 'List of all directors',
      resolve: () => directors,
    },
    movie: {
      type: MovieType,
      description: 'information about movie',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => movies.find((movie) => toKebabCase(movie.name) === args.name),
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

const app = express();

app.use(endPoint, cors(), graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000);
console.log(`Running a GraphQL API server at http://localhost:4000${endPoint}`);
