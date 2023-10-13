import { StorageService } from 'src/app/services/storage-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsList } from 'src/app/types/Item';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {

  constructor(public router: Router, private storageService: StorageService, private listsService: ListsService) { }

  @Input('itemsList') list!: ItemsList;

  itemsList!: ItemsList;
  lists: ItemsList[] = [];
  flag: boolean = false;

  ngOnChanges() {
    this.itemsList = this.list;
  }

  async ngOnInit() {
    this.getLists();
  }

  async getLists() {
    await this.storageService.get('lists')?.then((data) => {
      data ? this.lists = data : null;
    });
  }

  editList(event: Event, id: string) {
    event?.stopPropagation();
    this.router.navigateByUrl(`/tabs/lists/edit-list/${id}`);
  }

  deleteList(event: Event, id: string) {
    event?.stopPropagation();
  }

  async addToStarredList(event: Event, itemsList: ItemsList) {
    event?.stopPropagation();

    this.isListStarred(itemsList, true);
    this.listsService.addToStarredList(itemsList);
  }

  async removeFromStarredList(event: Event, itemsList: ItemsList) {
    event?.stopPropagation();

    this.isListStarred(itemsList, false);
  }

  isListStarred(itemsList: ItemsList, isStarred: boolean) {
    let value: any;
    this.lists.map((list: ItemsList, index: number) => {
      if (itemsList._id == list._id) {
        value = index;
      }
    });

    itemsList.isStarred = isStarred;
    this.lists.splice(value, 1, itemsList);
    this.storageService.set('lists', this.lists);
  }
}
