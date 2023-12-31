import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Item, ItemsList } from 'src/app/types/Item';
import { StorageService } from 'src/app/services/storage-service.service';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})

export class CreateListPage {

  title: string = 'Create List'
  itemsListForm!: FormGroup;
  tempList!: ItemsList | null;
  savedLists: ItemsList[] = [];

  tableHeader: Array<any> = [
    { title: 'No.', size: '1', class: 'table-header' },
    { title: 'Name', size: '4', class: 'table-header' },
    { title: 'Qty', size: '1', class: 'table-header' },
    { title: 'Type', size: '2', class: 'table-header' },
    { title: 'Price', size: '2', class: 'table-header' },
    { title: '', size: '1', class: 'table-header' },
  ];

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private listsService: ListsService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.initForm();
  }

  initForm() {
    this.itemsListForm = this.fb.group({
      _id: [null],
      title: [null],
      date: [new Date()],
      items: this.fb.array([]),
      total: [0],
    });
  };

  async ionViewWillEnter() {
    await this.storageService.get('lists')?.then(data => {
      data ? this.savedLists = data : null;
    });

    this.activatedRoute.params.subscribe((data: any) => {
      data.id != undefined ? this.title = 'Edit List' : this.title;
      this.savedLists.map(list => {
        if (list._id == data.id) {
          this.storageService.set('tempList', list);
        }
      });
    });
  }

  async ionViewDidEnter() {
    await this.storageService.get('tempList')?.then(data => {
      data ? this.tempList = data : null;
      if (this.itemsListForm?.value.items == 0){  // prevents duplicating items list
        this.patchFormValues(this.tempList);
      }
    });
  }

  get items(): FormArray {
    return this.itemsListForm?.get('items') as FormArray;
  }

  addItem() {
    const itemDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      brand: [null],
      category: [null],
      note: [null],
      checked: [false],
      price: [],
    });

    this.items?.push(itemDetailsForm);
    this.storageService.set('tempList', this.itemsListForm.value);
  }

  removeItem(index: number) {
    this.items?.removeAt(index);
    this.storageService.set('tempList', this.itemsListForm.value);
  }

  saveItemsList() {
    this.itemsListForm.value.date = new Date();
    if (this.title == 'Create List') {
      this.itemsListForm.value._id = this.listsService.generateUniqueId();

      this.savedLists?.push(this.itemsListForm.value);
      this.storageService.set('lists', this.savedLists);
      this.listsService.lists.next(this.savedLists)
      this.itemsListForm.reset();
    } else if (this.title == 'Edit List') {
      let i = 0;
      this.savedLists.map((list, index) => {
        if (list?._id == this.tempList?._id) {
          i = index;
        };
        this.savedLists.splice(i, 1, this.itemsListForm.value);
      });
      this.storageService.set('lists', this.savedLists);
      this.listsService.lists.next(this.savedLists)
      this.itemsListForm.reset();
    };
  }

  patchFormValues(data: ItemsList | null) {
    this.itemsListForm.patchValue({
      _id: data?._id,
      title: data?.title,
      date: data?.date,
      total: data?.total,
    });
    data ? this.patchFormArrays(data.items) : null;
  }

  patchFormArrays(data: Item[]) {
    data?.map((item) => {
      let temp = this.fb.group({
        name: [item?.name],
        brand: [item?.brand],
        type: [item?.type],
        quantity: [item?.quantity],
        category: [item?.category],
        note: [item?.note],
        checked: [item?.checked],
        price: [item?.price],
      });
      this.items?.push(temp);
    });
  }
}
