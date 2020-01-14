import { userLanguageEnum } from './enums';
import {
  updateAvatarResolver,
  updateConnectedResolver,
  updateLanguageResolver,
  updatePublicNameResolver
} from './resolvers';
import {
  BaseResolver,
  FieldConfig,
  gqlBoolean,
  gqlString,
  successResponseType
} from '../types';

export const updateAvatarMutation: FieldConfig = {
  type: successResponseType,
  args: {
    input: gqlString
  },
  resolve: updateAvatarResolver as BaseResolver
};

export const updateConnectedMutation: FieldConfig = {
  type: successResponseType,
  args: {
    status: gqlBoolean
  },
  resolve: updateConnectedResolver as BaseResolver
};

export const updateLanguageMutation: FieldConfig = {
  type: successResponseType,
  args: {
    newLanguage: {
      type: userLanguageEnum
    }
  },
  resolve: updateLanguageResolver as BaseResolver
};

export const updatePublicNameMutation: FieldConfig = {
  type: successResponseType,
  args: {
    input: gqlString
  },
  resolve: updatePublicNameResolver as BaseResolver
};
