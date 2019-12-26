import { gql } from 'apollo-server';

export default gql`
  type Client {
    id: ID!
    nom: String!
    phone: String!
    sex: String!
    adress: String!
  }

  type Token {
    token: String!
  }

  extend type Query {
    client(id: ID!): Client!
    clients: [Client!]!
    login(nom: String!, password: String!): Token!
  }

  extend type Mutation {
    createClient(nom: String!, password: String!, phone: String!): Client!
  }
`;