const typeDefs = `
    interface Person {
        first_name: String,
        last_name: String,
    }

    type Course {
        id: ID!
        name: String!
        author: String!
    }

    type Contact implements Person {
        # This is the contact ID
        id: ID!,
        # This is the contact's first name
        first_name: String,
        # This is the contact's last name
        last_name: String,
        # This is the contact's email address
        email: String,
        # This is the contact's phone number
        phone: String,
        # This is the contact's address
        address: String,
        # This is the contact's city name
        city: String,
        # This is the contact's image
        image: String
        # These are the contact's courses
        courses: [Course]!
    }

    input ContactInput {
        first_name: String!,
        last_name: String!,
        email: String,
        phone: String,
        address: String,
        city: String
    }

    type Query {
        Welcome: String!
        Me: Contact!
        Contacts(sortBy: String): [Contact]!
        ContactById(id: ID!): Contact!
        ContactsByName(name: String!): Contact!
    }

    type Mutation {
        addContact(input: ContactInput): Contact
        updateContact(id: ID, input: ContactInput): Contact
        deleteContact(id: ID): Contact
    }

    type Subscription {
        contactAdded: Contact!
    }

    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`;

module.exports = typeDefs;
