import { contactStatusEnum } from './enums';
import { contactResponseType } from './objectTypes';
import {
  addContactResolver,
  updateContactResolver,
  deleteContactResolver
} from './resolvers';
import {
  BaseResolver,
  FieldConfig,
  gqlString,
  successResponseType
} from '../types';

export const addMutation: FieldConfig = {
  type: contactResponseType,
  args: {
    contactName: gqlString
  },
  resolve: addContactResolver as BaseResolver
};

export const updateMutation: FieldConfig = {
  type: successResponseType,
  args: {
    targetId: gqlString,
    newStatus: {
      type: contactStatusEnum
    }
  },
  resolve: updateContactResolver as BaseResolver
};

export const deleteMutation: FieldConfig = {
  type: successResponseType,
  args: {
    input: gqlString
  },
  resolve: deleteContactResolver as BaseResolver
};
