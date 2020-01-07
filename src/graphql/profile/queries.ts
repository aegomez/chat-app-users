import { userProfileType, userGroupsType, userListsType } from './objectTypes';
import {
  userProfileResolver,
  userGroupsResolver,
  userListsResolver
} from './resolvers';
import { FieldConfig } from '../types';

export const getUserProfile: FieldConfig = {
  type: userProfileType,
  resolve: userProfileResolver
};

export const getUserGroups: FieldConfig = {
  type: userGroupsType,
  resolve: userGroupsResolver
};

export const getUserLists: FieldConfig = {
  type: userListsType,
  resolve: userListsResolver
};
