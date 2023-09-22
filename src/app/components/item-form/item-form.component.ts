import { StorageService } from './../../services/storage-service.service';
import { ListsService } from './../../services/lists.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Item } from 'src/app/types/Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  providers: [DatePipe]
})
export class ItemFormComponent {
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private listsService: ListsService,
    private router: Router,
    private storageService: StorageService
  ) { }

  itemsList: Item[] = [];
  formattedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  itemForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    brand: [null],
    quantity: ['', [Validators.required]],
    type: ['', [Validators.required]],
    price: ['', [Validators.required]],
    total: [0, [Validators.required]],
    note: [''],
    date: [this.formattedDate],
  });

  public async addItem() {
    let item = this.itemForm.value;
    if (this.itemForm.valid) {
      this.itemsList.push(item)
      this.itemForm.reset()
      this.itemForm.controls['date'].setValue(this.formattedDate)
    }
  }

  public async saveItems() {
    let savedLists = [];

    await this.storageService.get('lists')?.then(data => {
      data ? savedLists = data : null;
    });
    savedLists?.push(this.itemsList);
    console.log(savedLists, 'ssdsdsd')
    await this.storageService.set('lists', savedLists);

    this.router.navigateByUrl('/tabs/lists');

    this.itemsList = []
  }

  public onPriceChange() {
    let quantity = this.itemForm.value.quantity;
    let price = this.itemForm.value.price;

    this.itemForm.controls['total'].setValue(quantity * price)
  }

}

