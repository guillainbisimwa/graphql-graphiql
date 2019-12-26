import { gql } from 'apollo-server';

export default gql`
  type Group {
    id: ID!
    nom: String!
    detail: String!
  }

  extend type Query {
    group(id: ID!): Group!
    groups: [Group!]!
  }

  extend type Mutation {
    createGroup(nom: String!, detail: String!): Group!
  }
`;