/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

/**
 * @param object
 * @param path
 * @param required
 */
export function deepGet(
  object: Record<string, unknown>,
  path: Array<string> | string,
  required?: boolean,
): unknown {
  const pathSegment = Array.isArray(path) ? path : path.split('.');
  const [key] = pathSegment;
  const value = object[key] as Record<string, unknown> | null | undefined;

  if (pathSegment.length <= 1) {
    return value;
  }
  if (value === null || value === undefined || typeof value !== 'object') {
    if (required !== undefined && required) {
      throw new Error(`${key} not set in config`);
    }

    return undefined;
  }

  return deepGet(value, pathSegment.slice(1), required);
}
