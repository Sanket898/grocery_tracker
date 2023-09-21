import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ItemFormComponent } from './item-form/item-form.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ItemFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  exports: [ItemFormComponent]
})
export class SharedComponentModule { }
