import { userProfileType, userGroupsType } from './objectTypes';
import { userProfileResolver, userGroupsResolver } from './resolvers';
import { FieldConfig } from '../types';

export const getUserProfile: FieldConfig = {
  type: userProfileType,
  resolve: userProfileResolver
};

export const getUserGroups: FieldConfig = {
  type: userGroupsType,
  resolve: userGroupsResolver
};
