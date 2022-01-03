/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

export class FrameworkSettings {
  private readonly _settings: Map<string, unknown> = new Map<string, unknown>();

  setValue(key: string, value: unknown): void {
    if (this._settings.has(key)) {
      throw new Error(`Settings already has '${key}'`);
    }
    this._settings.set(key, value);
  }

  getValue<T>(key: string): T {
    if (this._settings.has(key)) {
      return this._settings.get(key) as T;
    }
    throw new Error(`Settings does not contain '${key}'`);
  }

  hasValue(key: string): boolean {
    return this._settings.has(key);
  }
}
