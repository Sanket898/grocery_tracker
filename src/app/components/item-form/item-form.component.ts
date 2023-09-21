import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Item } from 'src/app/types/Item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  providers: [DatePipe]
})
export class ItemFormComponent {
  constructor(private fb: FormBuilder, private datePipe: DatePipe) { }

  items: Item[] = [];
  lists: Array<any> = [];
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
      this.items.push(item)
      this.itemForm.reset()
      this.itemForm.controls['date'].setValue(this.formattedDate)
    }
  }

  public saveItems() {
    this.lists.push(this.items)
  }

  public async onPriceChange() {
    let quantity = this.itemForm.value.quantity;
    let price = this.itemForm.value.price;

    this.itemForm.controls['total'].setValue(quantity * price)
  }

  viewList(list: any) {
  }

}

