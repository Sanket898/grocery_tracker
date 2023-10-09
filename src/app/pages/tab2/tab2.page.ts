import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage-service.service';
import { ItemsList } from 'src/app/types/Item';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [DatePipe]
})
export class Tab2Page {

  lists: Array<ItemsList> = [];

  constructor(private storageService: StorageService) { }

  async ionViewWillEnter() {
    this.storageService.remove('tempList');
  }

  async ionViewDidEnter() {
    await this.storageService.get('lists')?.then((data) => {
      this.lists = data;
    });
  }

  viewList(list: ItemsList, index: number) {
    this.storageService.set('selectedList', list);
  }

  onClick() {
    this.storageService.remove('tempList');
  }

  clearStorage() {
    this.storageService.clear();
  }
}


