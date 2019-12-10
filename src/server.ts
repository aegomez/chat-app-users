import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
// import graphqlHTTP from 'express-graphql';

import { connect } from './db/connection';
// import { usersSchema } from './graphql';

const PORT = process.env.PORT || 3000;

const app = express();

// express middleware
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

// connect to database
connect()
  .then(() => console.log('Succesfully connected to DB.'))
  .catch(error => {
    console.error('Could not connect to database', error);
  });

// app.use(
//   '/q',
//   graphqlHTTP((_request, response) => ({
//     schema: authSchema,
//     graphiql: process.env.NODE_ENV === 'development',
//     context: { response }
//   }))
// );

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});
