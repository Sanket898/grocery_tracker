import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemFormComponent } from 'src/app/components/item-form/item-form.component';
import { ListsService } from 'src/app/services/lists.service';
import { StorageService } from 'src/app/services/storage-service.service';
import { ItemsList } from 'src/app/types/Item';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage {

  tempList!: ItemsList | null;

  @ViewChild('child', { static: false }) child!: ItemFormComponent;

  constructor(private listsService: ListsService, private storageService: StorageService, private router: Router) { }

  async ionViewDidEnter() {
    await this.storageService.get('tempList').then(data => this.tempList = data);

    this.listsService.itemsList.subscribe(data => this.tempList = data);
  }

  saveItemsList() {
    this.child.saveItemsList();
  }
}
