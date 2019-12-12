import { groupMembersType } from './objectTypes';
import { getGroupMembersResolver } from './resolvers';
import { BaseResolver, FieldConfig, gqlString } from '../types';

export const getGroupMembersQuery: FieldConfig = {
  type: groupMembersType,
  args: {
    groupId: gqlString
  },
  resolve: getGroupMembersResolver as BaseResolver
};
