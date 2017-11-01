const { GraphQLID, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql');
const Student = require('./Student.js');

const UniversityType = new GraphQLObjectType({
    name: 'UniversityType',
    description: 'University definition',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        state: { type: GraphQLString },
        image: { type: GraphQLString },
        adress: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        country_code: { type: GraphQLString },
        slogan: { type: GraphQLString },
        students: {
            type: new GraphQLList(Student),
            args: {
                gender: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args, context) {
                return parent.students.filter(student => {
                    return student.gender === args.gender
                })
            }
        }
    }
});

module.exports = UniversityType;