const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const CONTACT_ADDED = 'CONTACT_ADDED';
const ME = {
    id: 'B1v2hrR0X',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@doe.com',
    phone: '212-684-3189',
    address: '679 Kings Way',
    city: 'Dutsin Ma',
    image: 'https://user-images.githubusercontent.com/12070900/32746927-7496ef5a-c8b7-11e7-9958-579ac7c52569.png'
}

module.exports = {
    Query: {
        Welcome () {
            return 'Welcome to GraphQL';
        },
        Me (root, args, { db }) {
            return ME
        },
        Contacts (root, args, { db }) {
            return db.get('contacts')
                .sortBy(args.sortBy)
                .value()
        },
        ContactById (root, args, { db }) {
            return db.get('contacts')
                .find({ id: args.id })
                .value()
        },
        ContactsByName (root, args, { db }) {
            const contacts = db.get('contacts')
                                .find({ "last_name": args.name })
                                .value()

            return (Array.isArray(contacts)) ? contacts : [contacts];
        }
    },
    Mutation: {
        addContact (root, args, { db, shortid}) {
            const id = shortid.generate()
            db.get('contacts')
                .push(Object.assign({ id }, args.input))
                .write()

            const contact = db.get('contacts')
                            .find({ id })
                            .value()

            pubsub.publish(CONTACT_ADDED, { contact });
            return contact;
        },
        updateContact (root, args, { db }) {
            let input = args.input;

            db.get('contacts')
                .find({ id: args.id })
                .assign(input)
                .write()

            return db.get('contacts')
                .find({ id: args.id })
                .value()
        },
        deleteContact (root, args, { db }) {
            const contact = db.get('contacts')
                .find({ id: args.id })
                .value()

            db.get('contacts')
                .remove({ id: args.id })
                .write()

            return contact
        }
    },
    Subscription: {
        contactAdded: {
          subscribe: () => pubsub.asyncIterator(CONTACT_ADDED),
        }
    }
}
