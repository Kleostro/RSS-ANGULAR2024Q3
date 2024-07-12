import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class LoadingService {
  private isLoading$ = new BehaviorSubject<boolean>(false);

  toggleLoading(isLoading: boolean) {
    this.isLoading$.next(isLoading);
  }

  get isLoading() {
    return this.isLoading$;
  }
}
