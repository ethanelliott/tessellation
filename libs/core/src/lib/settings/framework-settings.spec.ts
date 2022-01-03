/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { FrameworkSettings } from './framework-settings';

describe('frameworkSettings', () => {
  it('should exist', () => {
    expect(FrameworkSettings).toBeTruthy();
  });

  it("should fail to get a value that doesn't exist", () => {
    const settings = new FrameworkSettings();

    expect(() => {
      settings.getValue('test');
    }).toThrow("Settings does not contain 'test'");
  });

  it('should be able to set', () => {
    const settings = new FrameworkSettings();

    expect(() => {
      settings.setValue('test', 'hello');
    }).not.toThrow();
  });

  it('should fail to overwrite', () => {
    const settings = new FrameworkSettings();

    settings.setValue('test', 'hello');
    expect(() => {
      settings.setValue('test', 'BAD');
    }).toThrow("Settings already has 'test'");
  });

  it('should be able to get', () => {
    const settings = new FrameworkSettings();

    settings.setValue('test', 'hello');
    expect(settings.getValue('test')).toBe('hello');
  });

  it("should not find a value that wasn't set", () => {
    const settings = new FrameworkSettings();

    expect(settings.hasValue('test')).toBe(false);
  });

  it('should find a value that was set', () => {
    const settings = new FrameworkSettings();

    settings.setValue('test', 'hello');
    expect(settings.hasValue('test')).toBe(true);
  });
});
