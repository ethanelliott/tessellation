/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

export const notNullOrUndefined = (
  value: unknown | null | undefined,
): boolean => value !== undefined && value !== null;

export const notNullish = (value: unknown): boolean => !!value;
