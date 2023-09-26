import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service.service';
import { ItemsList } from 'src/app/types/Item';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.page.html',
  styleUrls: ['./view-list.page.scss'],
})
export class ViewListPage {

  selectedList!: ItemsList | null;

  constructor(private storageService: StorageService) { }

  async ionViewDidEnter() {
    await this.storageService.get('selectedList')?.then((data: ItemsList) => {
      this.selectedList = data;
    });

  }
}
