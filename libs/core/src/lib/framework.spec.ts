/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

import { Framework } from './framework';
import { FrameworkLoader } from './loader/framework-loader';
import { FrameworkLoaderBase } from './loader/framework-loader-base';
import { FrameworkProvider } from './provider/framework-provider';

describe('framework', () => {
  it('should exist', () => {
    expect(Framework).toBeTruthy();
  });

  it('should have configure', () => {
    expect(Framework.configure).toBeTruthy();
  });

  it('should accept loaders and providers', () => {
    const x = Framework.configure({
      loaders: [],
      providers: [],
    });

    expect(x).toBeTruthy();
  });

  it('should be start-able', () => {
    const framework = Framework.configure({
      loaders: [],
      providers: [],
    });

    expect(framework).toHaveProperty('start');
  });

  it('should call loader', done => {
    const mockLoader = jest.fn();

    const loader = {
      loader(): FrameworkLoader {
        return (): void => {
          mockLoader();
        };
      },
    } as FrameworkLoaderBase;

    const framework = Framework.configure({
      loaders: [loader],
    });

    framework
      .start()
      .then(() => {
        expect(mockLoader.mock.calls).toHaveLength(1);
      })
      .catch(() => null)
      .finally(done);
  });

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
