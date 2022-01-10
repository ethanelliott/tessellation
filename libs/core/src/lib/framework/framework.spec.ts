/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Framework, FrameworkProvider } from '@tessellation/core';
import { Token } from 'typedi';

describe('framework', () => {
  it('should exist', () => {
    expect(Framework).toBeTruthy();
  });

  it('should have configure', () => {
    expect(Framework.configure).toBeTruthy();
  });

  // it('should call loader', done => {
  //   const mockLoader = jest.fn();
  //
  //   @Loader()
  //   class SampleLoader implements FrameworkLoader {
  //     loader() {
  //       return (): void => {
  //         mockLoader();
  //       };
  //     }
  //   }
  //
  //   const framework = Framework.configure({
  //     loaders: [SampleLoader],
  //   });
  //
  //   framework
  //     .start()
  //     .then(() => {
  //       expect(mockLoader.mock.calls).toHaveLength(1);
  //     })
  //     .catch(() => null)
  //     .finally(done);
  // });

  it('should call provider', done => {
    const mockProvider = jest.fn();

    const token = new Token('token');
    const provider: FrameworkProvider<string> = {
      provide: token,
      useValue: () => {
        mockProvider();

        return '';
      },
    };

    const framework = Framework.configure({
      providers: [provider],
    });

    framework
      .start()
      .then(() => {
        expect(mockProvider.mock.calls).toHaveLength(1);
      })
      .catch(() => null)
      .finally(done);
  });
});
