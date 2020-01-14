import { GraphQLObjectType } from 'graphql';

import { gqlBoolean, partialUserProfileType } from '../types';

export const contactResponseType = new GraphQLObjectType({
  name: 'UserContactResponseType',
  description:
    'After a contact operation, return a success flag and the contact partial data.',
  fields: () => ({
    success: gqlBoolean,
    profile: {
      type: partialUserProfileType
    }
  })
});
