import { Component, Input, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { ItemsList } from 'src/app/types/Item';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {

  constructor(private listsService: ListsService) { }

  @Input('itemsList') list!: ItemsList;

  itemsList!: ItemsList | null;

  ngOnChanges() {
    this.itemsList = this.list;
  }

  ngOnInit() { }

}
