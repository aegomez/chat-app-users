import { GraphQLEnumType } from 'graphql';

export const userLanguageEnum = new GraphQLEnumType({
  name: 'UserLanguageEnum',
  values: {
    auto: { value: 'auto' },
    en: { value: 'en' },
    es: { value: 'es' },
    pt: { value: 'pt' }
  }
});
