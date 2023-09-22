import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ListsService {
  constructor() { }

  lists: Subject<Array<any>> = new Subject();

}
