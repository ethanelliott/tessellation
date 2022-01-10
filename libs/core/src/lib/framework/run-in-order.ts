/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

/**
 * @param collection
 * @param callback
 */
export async function runInOrder<T, U>(
  collection: Array<T>,
  callback: (item: T) => Promise<U>,
): Promise<Array<U>> {
  const results: Array<U> = [];

  return await collection
    .reduce(
      async (promise, item) =>
        await promise
          .then(async () => await callback(item))
          .then(result => {
            results.push(result);
          }),
      Promise.resolve(),
    )
    .then(() => results);
}
