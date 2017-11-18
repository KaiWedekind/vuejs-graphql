const path = require('path');
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { createServer } = require('http');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const shortid = require('shortid')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ contacts: [] }).write()

const { schema } = require('./graphql');
const context = { db, shortid }

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/graphql', graphqlExpress({ schema, context }));
app.use('/explorer', graphiqlExpress({ 
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
}));

const server = createServer(app);

server.listen(port, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
      onConnect: () => {
        console.log('Client Connected')
      },
      onDisconnect: () => {
        console.log('Client Disconnected')
      }
    }, {
      server,
      path: '/subscriptions',
    });

    console.log(`Server is starting on port ${port}`);
});
