const typeDefs = `
  type Contact {
      id: ID!,
      first_name: String,
      last_name: String,
      email: String,
      phone: String,
      address: String,
      city: String
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
      Contacts(sortBy: String): [Contact]
      ContactById(id: ID!): Contact
      ContactsByName(name: String!): Contact
  }
  type Mutation {
      addContact(input: ContactInput): Contact
      updateContact(id: ID, input: ContactInput): Contact
      deleteContact(id: ID): Contact
  }
  schema {
      query: Query
      mutation: Mutation
  }
`;

module.exports = typeDefs;
