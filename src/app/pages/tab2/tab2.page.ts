import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Item } from 'src/app/types/Item';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [DatePipe]
})
export class Tab2Page {
  constructor(private fb: FormBuilder, private datePipe: DatePipe, private modalController: ModalController) { }

  items: Item[] = [];
  lists: Array<any> = [];
  formattedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  itemForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    brand: ['-'],
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
    }
  }

  public async saveItems() {
    this.lists.push(this.items)
  }

  public async onPriceChange() {
    let quantity = this.itemForm.value.quantity;
    let price = this.itemForm.value.price;

    this.itemForm.controls['total'].setValue(quantity * price)
  }

  viewList(list: any) {
    console.log(list)
  }



}


