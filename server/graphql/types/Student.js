const { GraphQLID, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');

const StudentType = new GraphQLObjectType({
    name: 'StudentType',
    description: 'Student definition',
    fields: {
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        ip_address: { type: GraphQLString }
    }
});

module.exports = StudentType;