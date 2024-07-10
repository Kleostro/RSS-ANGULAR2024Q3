import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class LoadingService {
  isLoading = new BehaviorSubject<boolean>(false);

  toggleLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }
}
