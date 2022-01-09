/*************************
 * Copyright 2021
 * competence.one Inc.
 *************************/

export enum HTTPResponseCodes {
  // 100: Information responses
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  // 200: Successful responses
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  // 300: Redirection messages
  NOT_MODIFIED = 304,
  // 400: Client error responses
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 405,
  // 500: Server error responses
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}
