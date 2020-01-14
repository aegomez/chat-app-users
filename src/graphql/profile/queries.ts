import { userProfileType, userListsType } from './objectTypes';
import { userProfileResolver, userListsResolver } from './resolvers';
import { FieldConfig } from '../types';

export const getUserProfile: FieldConfig = {
  type: userProfileType,
  resolve: userProfileResolver
};

export const getUserLists: FieldConfig = {
  type: userListsType,
  resolve: userListsResolver
};
