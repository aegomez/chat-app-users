import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';

import { gqlBoolean, gqlString } from '../types';

export const groupResponseType = new GraphQLObjectType({
  name: 'CreateGroupResponseType',
  description:
    'After a create group operation, return a success flag and, if successfull, the group and conversation ids.',
  fields: () => ({
    success: gqlBoolean,
    groupId: gqlString,
    conversation: gqlString
  })
});

export const groupMembersType = new GraphQLObjectType({
  name: 'GroupMembersListType',
  description:
    'After a get group members operation, return a success flag and a names array, if successful.',
  fields: () => ({
    success: gqlBoolean,
    members: {
      type: new GraphQLList(GraphQLString)
    }
  })
});