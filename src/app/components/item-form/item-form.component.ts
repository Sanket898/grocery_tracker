import { Item } from './../../types/Item';
import { StorageService } from './../../services/storage-service.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      items: this.fb.array([]),
      total: [0],
    });
  }
  async ngOnInit() {
    await this.storageService.get('tempList')?.then(data => {
      data ? this.tempList = data : null;
    });
  }

  get items(): FormArray {
    return this.itemsListForm?.get('items') as FormArray;
  }

  addItem() {
    const itemDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      brand: [null],
      type: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      category: [null],
      note: [null],
      checked: [false],
    });

    this.items?.push(itemDetailsForm);

    this.storageService.set('tempList', this.itemsListForm.value);
  }

  removeItem(index: number) {
    this.items?.removeAt(index);
  }

  async saveItems() {
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

