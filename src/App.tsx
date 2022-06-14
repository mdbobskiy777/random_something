import { BrowserRouter as Router } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import { createUploadLink } from 'apollo-upload-client';

import { allRoutes } from 'src/routes';

const uploadLink = createUploadLink({ uri: 'http://localhost:4000/graphql' });

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  // link: ApolloLink.from([authMiddleware, httpLink, uploadLink]),
  link: uploadLink,
});

export const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div>
        {allRoutes}
      </div>
    </Router>
  </ApolloProvider>
);
