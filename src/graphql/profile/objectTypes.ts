import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLType,
  GraphQLString
} from 'graphql';

import {
  gqlBoolean,
  gqlFloat,
  gqlInt,
  gqlString,
  GqlScalarMap,
  getPartialUserType
} from '../types';
import { contactStatusEnum } from '../contacts/enums';
import { UserProps } from '../../db/models';

type UserProfileMap = GqlScalarMap<
  Omit<UserProps, '_id' | '__v' | 'contacts' | 'groups'>
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

function getUserProfileType(): UserProfileMap {
  return {
    avatar: gqlString,
    connected: gqlString,
    language: gqlString,
    lastConnection: gqlInt,
    publicName: gqlString,
    userName: gqlString,
    contacts: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'UserProfileContact',
          fields: {
            ref: {
              type: new GraphQLObjectType({
                name: 'UserContactInfo',
                fields: getPartialUserType()
              })
            },
            conversation: gqlString,
            status: {
              type: contactStatusEnum
            }
          }
        })
      )
    },
    groups: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'UserProfileGroups',
          fields: {
            ref: {
              type: new GraphQLObjectType({
                name: 'GroupInfo',
                fields: {
                  members: {
                    type: new GraphQLObjectType({
                      name: 'GroupMemberInfo',
                      fields: getPartialUserType
                    })
                  },
                  conversation: gqlString,
                  avatar: gqlString,
                  name: gqlString
                }
              })
            },
            joined: gqlFloat
          }
        })
      )
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

export const userGroupsType = new GraphQLObjectType({
  name: 'UserGroupsListType',
  description:
    'After a get user groups operation, return a success flag and an array of ids, if successful.',
  fields: () => ({
    success: gqlBoolean,
    groups: {
      type: new GraphQLList(GraphQLString)
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
