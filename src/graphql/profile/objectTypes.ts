import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLType,
  GraphQLString
} from 'graphql';

import {
  gqlBoolean,
  gqlFloat,
  gqlID,
  gqlString,
  GqlScalarMap,
  partialUserProfileType
} from '../types';
import { contactStatusEnum } from '../contacts/enums';
import { groupType } from '../groups/objectTypes';
import { UserProps } from '../../db/models';

type UserProfileMap = GqlScalarMap<
  Omit<UserProps, '__v' | 'contacts' | 'groups'>
> & {
  // keeping it simple atm because nested
  // objects are a mess, not worth it
  contacts: {
    type: GraphQLList<GraphQLType>;
  };
  groups: {
    type: GraphQLList<GraphQLType>;
  };
};

const userProfileContactType = new GraphQLObjectType({
  name: 'UserProfileContact',
  description:
    'The contact partial profile, conversation id, and contact status.',
  fields: () => ({
    ref: {
      type: partialUserProfileType
    },
    conversation: gqlString,
    status: {
      type: contactStatusEnum
    }
  })
});

const userProfileGroupType = new GraphQLObjectType({
  name: 'UserProfileGroup',
  description: 'The group information, and date the user joined.',
  fields: () => ({
    ref: {
      type: groupType
    },
    joined: gqlFloat
  })
});

function getUserProfileType(): UserProfileMap {
  return {
    _id: gqlID,
    avatar: gqlString,
    connected: gqlString,
    language: gqlString,
    lastConnection: gqlFloat,
    publicName: gqlString,
    userName: gqlString,
    contacts: {
      type: new GraphQLList(userProfileContactType)
    },
    groups: {
      type: new GraphQLList(userProfileGroupType)
    }
  };
}

export const userProfileType = new GraphQLObjectType({
  name: 'UserProfileQueryType',
  description: 'The user profile and an operation success flag.',
  fields: () => ({
    success: gqlBoolean,
    profile: {
      type: new GraphQLObjectType({
        name: 'UserProfileData',
        description: 'The user profile complete initial data.',
        fields: getUserProfileType
      })
    }
  })
});

export const userListsType = new GraphQLObjectType({
  name: 'UserGroupsAndContactsListType',
  description:
    'After a get user lists operation, return a success flag and an array of ids, if successful.',
  fields: () => ({
    success: gqlBoolean,
    contacts: {
      type: new GraphQLList(GraphQLString)
    },
    groups: {
      type: new GraphQLList(GraphQLString)
    }
  })
});
