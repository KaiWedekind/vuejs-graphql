const typeDefs = `
    type StudentType {
        id: ID!,
        first_name: String!,
        last_name: String!,
        email: String!,
        gender: String!,
        ip_address: String!
    }

    type UniversityType {
        id: ID!,
        name: String!,
        state: String!,
        image: String!,
        adress: String!,
        city: String!,
        country: String!,
        country_code: String!,
        slogan: String!,
        students: [StudentType!]!
    }

    input StudentInput {
        first_name: String!,
        last_name: String!,
        email: String!,
        gender: String!,
        ip_address: String!
    }

    input StudentUpdate {
        id: ID!,
        first_name: String!,
        last_name: String!,
        email: String!,
        gender: String!,
        ip_address: String!
    }

    input UniversityInput {
        name: String!,
        state: String!,
        image: String!,
        adress: String!,
        city: String!,
        country: String!,
        country_code: String!,
        slogan: String!,
        studentIds: [ID!]!
    }

    type Query {
        Welcome: String

        AllStudents: [StudentType]
        StudentById(id: ID): StudentType
        StudentsByName(name: String): StudentType

        AllUniversities: [UniversityType]
        UniversityById(id: ID): UniversityType
    }

    type Mutation {
        add_student(input: StudentInput): StudentType
        update_student(id: ID, input: StudentInput): StudentType
        delete_student(id: ID): StudentType

        add_university(input: UniversityInput): UniversityType
        delete_university(id: ID): UniversityType
    }

    schema {
        query: Query
        mutation: Mutation
    }
`

module.exports = typeDefs;