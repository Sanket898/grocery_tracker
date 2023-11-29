import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  difference!: string | number;

  formFields: Array<any> = [
    { formControlName: 'buyPrice', label: 'Buy :', type: 'number'},
    { formControlName: 'sellPrice', label: 'Sell :', type: 'number'},
    { formControlName: 'quantity', label: 'Quantity :', type: 'number'},
    { formControlName: 'stopLossPrice', label: 'Stop Loss :', type: 'number'},
  ];

  constructor(private fb: FormBuilder) { }

  findTargetForm!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.findTargetForm = this.fb.group({
      buyPrice: [''],
      sellPrice: [''],
      stopLossPrice: [''],
      targetPrice: [''],
      return: [''],
      quantity: ['']
    });
  }

  getResult() {
    let value = (this.findTargetForm.value.buyPrice - this.findTargetForm.value.stopLossPrice) * 1.5;
    let targetPrice = +this.findTargetForm.value.stopLossPrice + value;

    let buyPrice = this.findTargetForm.value.buyPrice * this.findTargetForm.value.quantity;
    let sellPrice = this.findTargetForm.value.sellPrice * this.findTargetForm.value.quantity;

    let result = (+sellPrice * 100 / +buyPrice) - 100;
    this.difference = sellPrice - buyPrice;

    this.findTargetForm.controls['targetPrice'].setValue(targetPrice);
    this.findTargetForm.controls['return'].setValue(result);
  }
}
