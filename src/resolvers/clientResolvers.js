import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    client: async (parent, { id }, { models: { clientModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const client = await clientModel.findById({ _id: id }).exec();
      return client;
    },
    login: async (parent, { nom, password }, { models: { clientModel } }, info) => {
      const client = await clientModel.findOne({ nom }).exec();

      if (!client) {
        throw new AuthenticationError('Invalid credentials');
      }

      const matchPasswords = bcrypt.compareSync(password, client.password);

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign({ id: client.id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 });

      return {
        token,
      };
    },
  },
  Mutation: {
    createClient: async (parent, { nom, password }, { models: { clientModel } }, info) => {
      const client = await clientModel.create({ nom, password });
      return client;
    },
  },
  Client: {
    group: async ({ id }, args, { models: { groupModel } }, info) => {
      const group = await groupModel.find({ author: id }).exec();
      return group;
    },
  },
};