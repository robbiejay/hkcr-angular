import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyService {

  firstLoad: boolean;
  constructor() { }

  imageHasLoaded() {
    this.firstLoad = true;
  }
}
