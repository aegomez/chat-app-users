import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import graphqlHTTP from 'express-graphql';

import { connect } from './db/connection';
import { asyncMiddleware, validateCookies } from './utils';
import { usersSchema } from './graphql';

const PORT = process.env.PORT || 3000;

const app = express();

// express middleware
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

// custom middleware
app.use(asyncMiddleware(validateCookies));

// connect to database
connect()
  .then(() => console.log('Succesfully connected to DB.'))
  .catch(error => {
    console.error('Could not connect to database', error);
  });

// GraphQL route
app.use(
  '/gql',
  graphqlHTTP(() => ({
    schema: usersSchema,
    graphiql: process.env.NODE_ENV === 'development'
  }))
);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});
