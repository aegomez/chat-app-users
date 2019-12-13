import { GraphQLEnumType } from 'graphql';

export const userLanguageEnum = new GraphQLEnumType({
  name: 'UserLanguageEnum',
  values: {
    en: { value: 'en' },
    es: { value: 'es' },
    pt: { value: 'pt' }
  }
});
