import { ListsService } from 'src/app/services/lists.service';
import { ItemsList } from './../../types/Item';
import { StorageService } from './../../services/storage-service.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  providers: [DatePipe]
})
export class ItemFormComponent implements OnInit {

  itemsListForm!: FormGroup;
  tempList!: ItemsList;
  savedLists: ItemsList[] = [];
  List!: ItemsList;

  formattedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private storageService: StorageService,
    private listsService: ListsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.itemsListForm = this.fb.group({
      _id: [null],
      title: [null],
      date: [new Date()],
      items: this.fb.array([]),
      total: [0],
    });
  }

  async ngOnInit() {
    await this.storageService.get('tempList')?.then(data => {
      data ? this.tempList = data : null;
      this.patchFormValues(this.tempList);
    });

    await this.storageService.get('lists')?.then(data => {
      data ? this.savedLists = data : null;
    });

    this.activatedRoute.params.subscribe((data: any) => {
      this.savedLists.map(list => {
        if (list._id == data.id) {
          this.patchFormValues(list)
        }
      });
    }
    )
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
    });
    this.items?.push(itemDetailsForm);
    this.storageService.set('tempList', this.itemsListForm.value);
    this.listsService.itemsList.next(this.itemsListForm.value);
  }

  removeItem(index: number) {
    this.items?.removeAt(index);
    this.storageService.set('tempList', this.itemsListForm.value);
    this.listsService.itemsList.next(this.itemsListForm.value);
  }

  async saveItemsList() {
    if (this.itemsListForm.valid) {
      await this.storageService.get('lists')?.then(data => {
        data ? this.savedLists = data : null;
      });

      this.itemsListForm.value._id = this.listsService.generateUniqueId();
      this.savedLists?.push(this.itemsListForm.value);
      this.storageService.set('lists', this.savedLists);
      this.listsService.lists.next(this.savedLists)

      this.router.navigateByUrl('/tabs/lists');
      this.itemsListForm.reset();
      this.storageService.remove('tempList');
      this.listsService.itemsList.next(this.itemsListForm.value);
    }
  }

  patchFormValues(data: ItemsList) {
    this.itemsListForm.patchValue({
      title: data?.title,
      date: data?.date,
      total: data?.total,
    });
    this.patchFormArrays(data);
  }

  patchFormArrays(data: ItemsList) {
    data?.items?.map((item) => {
      let temp = this.fb.group({
        name: [item?.name],
        brand: [item?.brand],
        type: [item?.type],
        quantity: [item?.quantity],
        category: [item?.category],
        note: [item?.note],
        checked: [item?.checked],
      });
      this.items?.push(temp);
    });
  }
}

