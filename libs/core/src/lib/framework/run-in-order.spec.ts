/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { runInOrder } from './run-in-order';

describe('runInOrder', () => {
  it('should exist', () => {
    expect(runInOrder).toBeTruthy();
  });

  it('should run in order with no promises', done => {
    const arrayOfValues = Array(4)
      .fill(0)
      .map((_, index) => index);
    const appliedFunction = async (item: number): Promise<number> =>
      await Promise.resolve().then(() => item * 2);

    runInOrder(arrayOfValues, appliedFunction)
      .then(result => {
        expect(result).toEqual([0, 2, 4, 6]);
      })
      .catch(error => console.error(error))
      .finally(() => {
        done();
      });
  });
});
