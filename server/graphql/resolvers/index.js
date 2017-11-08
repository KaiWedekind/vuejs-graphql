module.exports = {
    Query: {
        Welcome () {
            return 'Welcome to GraphQL';
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

            return db.get('contacts')
                .find({ id })
                .value()
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
    }
}
