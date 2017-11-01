const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const { schema } = require('./graphql');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/explorer', cors(), graphqlHTTP({
      schema,
      graphiql: true
    })
);

app.use('/graphql', cors(), graphqlHTTP({
    schema,
    graphiql: false
  })
);

app.listen(port);