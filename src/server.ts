import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import graphqlHTTP from 'express-graphql';

import { connect } from './db/connection';
import { asyncMiddleware, validateCookies } from './utils';
import { usersSchema } from './graphql/schema';

const PORT = process.env.PORT || 3000;

const app = express();

// express middleware
app.use(express.json());
app.use(compression());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// custom middleware
app.use(asyncMiddleware(validateCookies));

// GraphQL route
app.use(
  '/gql',
  graphqlHTTP(() => ({
    schema: usersSchema,
    graphiql: process.env.NODE_ENV === 'development'
  }))
);

// connect to database
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server up and running on port ${PORT}.`);
    });
  })
  .catch(() => {
    console.error('Connect to DB failed after retries.');
  });
