import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLString,
  GraphQLScalarType,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLObjectType
} from 'graphql';
import { Request } from 'express';

import { PartialUserProps } from '../db/models';

interface WithSuccess {
  success: boolean;
}

/// ----- Scalar types shorcuts ----- ///

export const gqlBoolean = { type: GraphQLBoolean };
export const gqlFloat = { type: GraphQLFloat };
export const gqlString = { type: GraphQLString };

/// ----- Common types and mappers ----- ///

/**
 * Custom field config with Request as context.
 */
export type FieldConfig = GraphQLFieldConfig<{}, Request>;

/**
 * Accept a Dictionary with string indexes and
 * any value types, and map each of those
 * values to a generic GraphQL scalar type.
 * @example
 * interface Ex {
 *   a: string;
 *   b: number;
 * }
 * type mapped = GqlScalarMap<Ex> = {
    a: { type: GraphQLScalarType };
    b: { type: GraphQLScalarType };
}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GqlScalarMap<S extends { [key: string]: any }> = Record<
  keyof S,
  { type: GraphQLScalarType }
>;

/**
 * A GraphQL field resolver with all arguments
 * set as any. Used to typecast custom resolvers
 * and avoid type mismatches when being assigned
 * to a FieldConfig or Schema.
 */
export type BaseResolver = GraphQLFieldResolver<{}, {}>;

/**
 * Map the express Request object to the `context`
 * parameter of a graphql resolver function, and
 * replace its return type with a custom Promise
 * that can be extended with an optional 'RT' type
 * argument. A second optional type argument
 * `TArgs` can be mapped to the `args` parameter
 * of the resolver.
 */
export type CustomResolver<RT = {}, TArgs = {}> = (
  ...args: Parameters<GraphQLFieldResolver<{}, Request, TArgs>>
) => Promise<WithSuccess & RT>;

// Same as the CustomResolver but accepts a
// single string input parameter.
export type InputResolver = CustomResolver<{}, { input: string }>;

/**
 * Get a partial user profile.
 * Used in nested profile operations.
 */
function getPartialUserType(): GqlScalarMap<PartialUserProps> {
  return {
    _id: gqlString,
    avatar: gqlString,
    connected: gqlBoolean,
    lastConnection: gqlFloat,
    publicName: gqlString,
    userName: gqlString
  };
}

/// ----- Common ObjectTypes ----- ///

export const partialUserProfileType = new GraphQLObjectType({
  name: 'PartialUserProfile',
  description: 'Selected user properties visible to contacts and groups.',
  fields: getPartialUserType
});

export const successResponseType = new GraphQLObjectType({
  name: 'SuccessResponseType',
  description: 'After an operation, returns a single success flag.',
  fields: () => ({
    success: gqlBoolean
  })
});
