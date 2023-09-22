import { ListsService } from './../../services/lists.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [DatePipe]
})
export class Tab2Page {

  lists: Array<any> = [];

  constructor(private listsService: ListsService, private storageService: StorageService) { }

  async ionViewDidEnter() {
    this.listsService.lists.subscribe(data => {
      this.lists = data;
    });

    await this.storageService.get('lists')?.then((data) => {
      this.lists = data;
    });
  }
}


