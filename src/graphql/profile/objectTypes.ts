import { GraphQLObjectType, GraphQLList, GraphQLType } from 'graphql';

import {
  gqlBoolean,
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
            members: {
              type: new GraphQLObjectType({
                name: 'GroupMemberInfo',
                fields: getPartialUserType
              })
            },
            conversation: gqlString,
            avatar: gqlString
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
