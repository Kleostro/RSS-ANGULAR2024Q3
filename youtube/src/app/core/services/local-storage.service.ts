import { Injectable } from '@angular/core';

import Data from '../types/storage.interface';

export const STORE_KEYS = {
  LS_NAME: 'kleostro',
  USER_LOGIN: 'userLogin',
  USER_TOKEN: 'userToken',
};

@Injectable({
  providedIn: 'root',
})
export default class LocalStorageService {
  public storage: Data = this.init();

  public get<T>(key: string): T | undefined {
    if (key in this.storage) {
      const result: T = JSON.parse(this.storage[key]);
      return result;
    }
    return undefined;
  }

  public add(key: string, value: string): void {
    this.storage[key] = value;
    this.save(this.storage);
  }

  public remove(key: string): void {
    delete this.storage[key];
    this.save(this.storage);
  }

  public clear(): void {
    localStorage.clear();
    this.init();
  }

  private save(data: Data): void {
    localStorage.setItem(STORE_KEYS.LS_NAME, JSON.stringify(data));
    this.storage = this.init();
  }

  private init(): Data {
    const storedData = localStorage.getItem(STORE_KEYS.LS_NAME);

    const safeJsonParse = <T>(str: string): T => {
      try {
        const jsonValue: T = JSON.parse(str);
        return jsonValue;
      } catch {
        throw new Error('I need help >_<');
      }
    };

    if (storedData) {
      this.storage = safeJsonParse(storedData);
    } else {
      localStorage.setItem(STORE_KEYS.LS_NAME, '{}');
      this.storage = this.init();
    }

    return this.storage;
  }
}
