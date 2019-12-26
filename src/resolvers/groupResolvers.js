import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    group: async (parent, { id }, { models: { groupModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const group = await groupModel.findById({ _id: id }).exec();
      return group;
    },
    groups: async (parent, args, { models: { groupModel } }, info) => {
      const groups = await groupModel.find().exec();
      return groups;
    },
    // groups: async (parent, args, { models: { groupModel }, me }, info) => {
    //   if (!me) {
    //     throw new AuthenticationError('You are not authenticated');
    //   }
    //   const groups = await groupModel.find({ author: me.id }).exec();
    //   return groups;
    // },
  },
  Mutation: {
    createGroup: async (parent, { nom, detail }, { models: { groupModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const group = await groupModel.create({ nom, detail });
      //const group = await groupModel.create({ nom, detail, author: me.id });
      return group;
    },
  },
  Group: {
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    },
  },
};