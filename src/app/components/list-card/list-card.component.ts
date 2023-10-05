import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListsService } from 'src/app/services/lists.service';
import { ItemsList } from 'src/app/types/Item';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {

  constructor(private listsService: ListsService, private router: Router) { }

  @Input('itemsList') list!: ItemsList;

  itemsList!: ItemsList;

  ngOnChanges() {
    this.itemsList = this.list;
  }

  ngOnInit() { }

  editList(event: any, id: string) {
    event?.stopPropagation();
    this.router.navigateByUrl(`/tabs/lists/edit-list/${id}`);
  }

  deleteList(event: any, id: string) {
    event?.stopPropagation();
    console.log(id)
  }
}
