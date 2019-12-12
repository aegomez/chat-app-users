import { GraphQLEnumType } from 'graphql';

export const userLanguageEnum = new GraphQLEnumType({
  name: 'UserLanguageEnum',
  values: {
    en: { value: 0 },
    es: { value: 1 },
    pt: { value: 2 }
  }
});
