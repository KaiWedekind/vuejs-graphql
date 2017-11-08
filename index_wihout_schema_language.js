const shortid = require('shortid')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ contacts: [] })
    .write()

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql');

const Contact = new GraphQLObjectType({
  name: 'Contact',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
  }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        description: 'API Query Documentation',
        fields: {
            Welcome: {
                type: GraphQLString,
                resolve() {
                    return 'Welcome to GraphQL';
                }
            },
            Contacts: {
              type: new GraphQLList(Contact),
              args: {
                sortBy: { type: GraphQLString }
              },
              resolve(root, args, context) {
                  return db.get('contacts')
                            .sortBy(args.sortBy)
                            .value()
              }
            },
            ContactById: {
                type: Contact,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) }
                },
                resolve(root, args, context) {
                    return db.get('contacts')
                                .find({ id: args.id })
                                .value()
                }
            },
            ContactsByName: {
                type: new GraphQLList(Contact),
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve(root, args, context) {
                    const contacts = db.get('contacts')
                                        .find({ "last_name": args.name })
                                        .value()

                    return (Array.isArray(contacts)) ? contacts : [contacts];
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            addContact: {
                type: Contact,
                args: {
                    first_name: { type: new GraphQLNonNull(GraphQLString) },
                    last_name: { type: new GraphQLNonNull(GraphQLString) },
                    email: { type: GraphQLString },
                    phone: { type: GraphQLString },
                    address: { type: GraphQLString },
                    city: { type: GraphQLString },
                },
                resolve(root, args, context) {
                    const id = shortid.generate() 
                    db.get('contacts')
                        .push(Object.assign({ id }, args))
                        .write()

                    return db.get('contacts')
                        .find({ id })
                        .value()
                }
            }
        }
    })
});

module.exports = {
    schema
}
