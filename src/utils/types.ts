import { RequestHandler } from 'express';

// Declaration merging
// Augment the original Request interface
declare module 'express-serve-static-core' {
  interface Request {
    _userId: string;
    _userName: string;
  }
}

// A RequestHandler function that returns a
// Promise that resolves to type `RT`.
export interface AsyncMiddleware<RT> {
  (...args: Parameters<RequestHandler>): Promise<RT>;
}

// The response type of verifyToken query
export interface VerifyResponse {
  verify: {
    valid: boolean;
    _userId: string;
    _userName: string;
  };
}
