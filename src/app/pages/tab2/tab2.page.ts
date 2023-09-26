import { ListsService } from './../../services/lists.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage-service.service';
import { ItemsList } from 'src/app/types/Item';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [DatePipe]
})
export class Tab2Page {

  lists: Array<ItemsList> = [];

  constructor(private storageService: StorageService) { }

  async ionViewDidEnter() {
    await this.storageService.get('lists')?.then((data) => {
      this.lists = data;
    });
  }

  viewList(list: ItemsList) {
    this.storageService.set('selectedList', list);
  }

  clearStorage() {
    this.storageService.clear();
  }
}


