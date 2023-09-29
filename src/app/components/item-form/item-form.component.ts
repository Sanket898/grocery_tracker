import { Item, ItemsList } from './../../types/Item';
import { StorageService } from './../../services/storage-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Tab2Page } from 'src/app/pages/tab2/tab2.page';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  providers: [DatePipe]
})
export class ItemFormComponent implements OnInit {

  itemsListForm!: FormGroup;
  itemDetailsForm!: FormGroup;
  component = Tab2Page;

  formattedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  tempList: Item[] = [];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private storageService: StorageService,
  ) {
    this.itemsListForm = this.fb.group({
      title: [null],
      date: [this.formattedDate, [Validators.required]],
      items: [null],
      total: [0],
    });

    this.itemDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      brand: [null],
      type: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      category: [null],
      note: [null],
      checked: [false],
    });
  }
  async ngOnInit() {
    await this.storageService.get('tempList')?.then(data => {
      data ? this.tempList = data : null;
    });
  }

  public async addItems() {
    let value: Item = this.itemDetailsForm.value;
    this.tempList.push(value);
    this.itemsListForm.controls['items'].setValue(this.tempList)
    this.storageService.set('tempList', this.itemsListForm.value);
    this.itemDetailsForm.reset();
  }

  removeItem(index: number) { }

  public async saveItems() {
    let savedLists = [];

    await this.storageService.get('lists')?.then(data => {
      data ? savedLists = data : null;
    });

    savedLists?.push(this.itemsListForm.value);
    this.storageService.set('lists', savedLists);

    this.router.navigateByUrl('/tabs/lists');

    this.itemsListForm.reset();
    this.storageService.remove('tempList');
  }

}
