import { GraphQLEnumType } from 'graphql';

export const contactStatusEnum = new GraphQLEnumType({
  name: 'ContactStatus',
  values: {
    accepted: { value: 0 },
    blocked: { value: 1 },
    pending: { value: 2 }
  }
});
