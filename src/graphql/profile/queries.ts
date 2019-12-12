import { userProfileType } from './objectTypes';
import { userProfileResolver } from './resolvers';
import { FieldConfig } from '../types';

export const userProfileQuery: FieldConfig = {
  type: userProfileType,
  resolve: userProfileResolver
};
