import { groupResponseType, addGroupMemberType } from './objectTypes';
import {
  createGroupResolver,
  addGroupMemberResolver,
  deleteGroupMemberResolver
} from './resolvers';
import {
  BaseResolver,
  FieldConfig,
  successResponseType,
  gqlString
} from '../types';

export const createMutation: FieldConfig = {
  type: groupResponseType,
  args: {
    avatar: gqlString,
    name: gqlString
  },
  resolve: createGroupResolver as BaseResolver
};

export const addMemberMutation: FieldConfig = {
  type: addGroupMemberType,
  args: {
    groupId: gqlString,
    userId: gqlString
  },
  resolve: addGroupMemberResolver as BaseResolver
};

export const deleteMemberMutation: FieldConfig = {
  type: successResponseType,
  args: {
    groupId: gqlString,
    userId: gqlString
  },
  resolve: deleteGroupMemberResolver as BaseResolver
};
