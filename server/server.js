const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const shortid = require('shortid')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ contacts: [] })
    .write()

const { schema } = require('./graphql');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/explorer', graphqlHTTP({
      schema,
      context: {
        db,
        shortid
      },
      graphiql: true
    })
);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: false
  })
);

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
