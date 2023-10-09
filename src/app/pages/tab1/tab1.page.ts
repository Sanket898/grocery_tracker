import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service.service';
import { ItemsList } from 'src/app/types/Item';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  starredList: Array<ItemsList> = [];

  constructor(private storageService: StorageService) { }

  async ionViewWillEnter() {
    await this.storageService.get('lists')?.then((data: ItemsList[]) => {
      data.map(list => {
        if (list.isStarred && !this.isPresent(list)) {
          this.starredList.push(list);
        }
      })
    });
  }

  isPresent(itemList: ItemsList) {
    let flag = this.starredList.find(list => list._id == itemList._id);
    return flag;
  }
}
