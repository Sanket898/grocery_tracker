import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ItemsList } from '../types/Item';

@Injectable({
  providedIn: 'root'
})

export class ListsService {

  itemsList = new Subject<ItemsList>();
  lists = new Subject<ItemsList[]>();

  // Function to generate a unique alphanumeric ID
  generateUniqueId() {
    const generatedIds = new Set();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    // Generate a random ID until it's unique
    do {
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
      }
    } while (generatedIds.has(id));

    // Add the generated ID to the set
    generatedIds.add(id);

    return id;
  }
}
