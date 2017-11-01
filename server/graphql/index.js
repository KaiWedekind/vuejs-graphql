const shortid = require('shortid')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ students: [], universities: {} })
    .write()

const { GraphQLSchema, GraphQLObjectType, GraphQLInputObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');
const { Student, University } = require('./types');

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
            AllStudents: {
                type: new GraphQLList(Student),
                resolve() {
                    return db.get('students').value()
                }
            },
            StudentById: {
                type: Student,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) }
                },
                resolve(_, args, context) {
                    return db.get('students')
                        .find({ id: args.id })
                        .value()
                }
            },
            StudentsByName: {
                type: new GraphQLList(Student),
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve(_, args, context) {
                    return db.get('students')
                        .find({ last_name: args.name })
                        .value()
                }
            },
            AllUniversities: {
                type: new GraphQLList(University),
                resolve() {
                    return db.get('universities').value()
                }
            },
            UniversityById: {
                type: University,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) }
                },
                resolve(_, args, context) {
                    return db.get('universities')
                        .find({ id: args.id })
                        .value()
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        description: 'API Mutation Documentation',
        fields: {
            add_student: {
                type: Student,
                args: {
                    first_name: { type: new GraphQLNonNull(GraphQLString) },
                    last_name: { type: new GraphQLNonNull(GraphQLString) },
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    gender: { type: new GraphQLNonNull(GraphQLString) },
                    ip_address: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve(_, args, context) {
                    args.id = shortid.generate();
                    db.get('students')
                        .push(args)
                        .write()
                    return args
                }
            },
            update_student: {
                type: Student,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                    first_name: { type: GraphQLString },
                    last_name: { type: GraphQLString },
                    email: { type: GraphQLString },
                    gender: { type: GraphQLString },
                    ip_address: { type: GraphQLString }
                },
                resolve(_, args, context) {
                    db.get('students')
                        .find({ id: args.id })
                        .assign(args)
                        .write()

                    return db.get('students')
                            .find({ id: args.id })
                            .value()
                }
            },
            delete_student: {
                type: Student,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) }
                },
                resolve(_, args, context) {
                    const student = db.get('students')
                        .find({ id: args.id })
                        .value()

                    db.get('students')
                        .remove({ id: args.id })
                        .write()

                    return student
                }
            },
            add_university: {
                type: University,
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    state: { type: GraphQLString },
                    image: { type: GraphQLString },
                    adress: { type: GraphQLString },
                    city: { type: GraphQLString },
                    country: { type: GraphQLString },
                    country_code: { type: GraphQLString },
                    slogan: { type: GraphQLString },
                    studentIds: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLID))
                    }
                },
                resolve(_, args, context) {
                    const students = [];
                    if(args.studentIds && Array.isArray(args.studentIds)) {
                        args.studentIds.forEach((id) => {
                            const student = db.get('students').find({ id }).value();
                            if(student) { students.push(student) }
                        });
                    }
                    args.studentIds = undefined;
                    args.students = students;

                    args.id = shortid.generate();
                    db.get('universities')
                        .push(args)
                        .write()
                    return args

                }
            },
            delete_university: {
                type: University,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) }
                },
                resolve(_, args, context) {
                    const student = db.get('universities')
                    .find({ id: args.id })
                    .value()

                    db.get('universities')
                        .remove({ id: args.id })
                        .write()

                    return student
                }
            }
        }
    })
});

module.exports = {
    schema
}
