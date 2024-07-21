import { Injectable } from '@angular/core';

import STORE_KEYS from '../constants/store';
import Data from '../interfaces/storage.interface';

@Injectable({
  providedIn: 'root',
})
export default class LocalStorageService {
  storage: Data = this.init();

  getValueByKey<T>(key: string): T | null {
    if (key in this.storage) {
      const result: T = JSON.parse(this.storage[key]);
      return result;
    }
    return null;
  }

  addValue(key: string, value: unknown): void {
    this.storage[key] = JSON.stringify(value);
    this.save(this.storage);
  }

  removeValueByKey(key: string): void {
    delete this.storage[key];
    this.save(this.storage);
  }

  clear(): void {
    localStorage.clear();
    this.init();
  }

  save(data: Data): void {
    localStorage.setItem(STORE_KEYS.LS_NAME, JSON.stringify(data));
    this.storage = this.init();
  }

  init(): Data {
    const storedData = localStorage.getItem(STORE_KEYS.LS_NAME);

    const safeJsonParse = <T>(str: string): T => {
      try {
        const jsonValue: T = JSON.parse(str);
        return jsonValue;
      } catch {
        throw new Error('Parsing error');
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
