import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

title: BehaviorSubject<string>;
movieId: BehaviorSubject<number>;

  constructor() {
    this.title = new BehaviorSubject('Movie-Night');
    this.movieId = new BehaviorSubject(0);
   }
}
