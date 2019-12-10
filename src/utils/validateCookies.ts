/* eslint-disable require-atomic-updates */
import { parse } from 'cookie';
import { request } from 'graphql-request';

import { AsyncMiddleware, VerifyResponse } from './types';

const verifyTokenQuery = /* GraphQL */ `
  query verifyToken($token: String) {
    verify(token: $token) {
      valid
      _userId
      _userName
    }
  }
`;

export const validateCookies: AsyncMiddleware<void> = async (
  req,
  _res,
  next
) => {
  try {
    const cookies = parse(req.headers.cookie || '');
    // If the cookie does not even exist:
    if (!cookies.token) next();

    // Extract just the token value
    const token = cookies.token.replace('Bearer%20', '');

    // Call the auth server to verify token
    const auth = await request<VerifyResponse>('api/auth', verifyTokenQuery, {
      token
    });
    // If response is bad:
    if (!auth.valid) next('Auth server bad response');

    // If response is ok...
    if (auth.valid === false) {
      // ...but token is not valid
      req._userId = 'NOT_AUTHORIZED';
    } else {
      // ...and token is valid
      req._userId = auth._userId;
      req._userName = auth._userName;
    }
    next();
  } catch (e) {
    console.error('Error validateCookiesAsync', e);
    next();
  }
};
