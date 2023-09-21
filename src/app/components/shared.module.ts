import { ListCardComponent } from './list-card/list-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemFormComponent } from './item-form/item-form.component';



@NgModule({
  declarations: [ItemFormComponent, ListCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ItemFormComponent, ListCardComponent]
})
export class SharedModule { }
