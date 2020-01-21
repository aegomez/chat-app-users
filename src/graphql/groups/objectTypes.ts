import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';

import { gqlBoolean, gqlID, gqlString, partialUserProfileType } from '../types';

export const groupResponseType = new GraphQLObjectType({
  name: 'CreateGroupResponseType',
  description:
    'After a create group operation, return a success flag and, if successfull, the group and conversation ids.',
  fields: () => ({
    success: gqlBoolean,
    _id: gqlID,
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

// The full group model type
export const groupType = new GraphQLObjectType({
  name: 'GroupInfo',
  description: 'The groups members, conversation id, group name and avatar.',
  fields: () => ({
    members: {
      type: new GraphQLList(partialUserProfileType)
    },
    _id: gqlID,
    conversation: gqlString,
    name: gqlString,
    avatar: gqlString
  })
});

export const addGroupMemberType = new GraphQLObjectType({
  name: 'NewGroupMemberType',
  description:
    'After adding a new group member, return a success flag and their partial profile.',
  fields: () => ({
    success: gqlBoolean,
    newMember: { type: partialUserProfileType }
  })
});
