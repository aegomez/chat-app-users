import { GraphQLEnumType } from 'graphql';

export const contactStatusEnum = new GraphQLEnumType({
  name: 'ContactStatus',
  values: {
    accepted: { value: 'accepted' },
    blocked: { value: 'blocked' },
    pending: { value: 'pending' }
  }
});
