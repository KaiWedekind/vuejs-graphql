const shortid = require('shortid')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ students: [], universities: {} })
    .write()

const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./types/typeDefs');

const resolvers = {
    Query: {
        Welcome: () => 'Welcome to GraphQL',
        AllStudents: () => db.get('students').value(),
        StudentById: (_, args, context) => {
            return db.get('students')
                .find({ id: args.id })
                .value()
        },
        StudentsByName: (_, args, context) => {
            return db.get('students')
                .find({ last_name: args.name })
                .value()
        },
        AllUniversities: () => db.get('universities').value(),
        UniversityById: (_, args, context) => {
            return db.get('universities')
                .find({ id: args.id })
                .value()
        }
    },
    Mutation: {
        add_student: (_, args, context) => {
            let input = args.input;
            input.id = shortid.generate();
            db.get('students')
                .push(input)
                .write()
            return input
        },
        update_student: (_, args, context) => {
            let input = args.input;

            db.get('students')
                .find({ id: args.id })
                .assign(input)
                .write()

            return db.get('students')
                .find({ id: args.id })
                .value()
        },
        delete_student: (_, args, context) => {
            const student = db.get('students')
                .find({ id: args.id })
                .value()

            db.get('students')
                .remove({ id: args.id })
                .write()

            return student
        },
        add_university: (_, args, context) => {
            let input = args.input;
            const students = [];
            if(input.studentIds && Array.isArray(input.studentIds)) {
                input.studentIds.forEach((id) => {
                    const student = db.get('students').find({ id }).value();
                    if(student) { students.push(student) }
                });
            }
            input.studentIds = undefined;
            input.students = students;

            input.id = shortid.generate();
            db.get('universities')
                .push(input)
                .write()
            return input
        },
        delete_university: (_, args, context) => {
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

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = {
    schema
}
