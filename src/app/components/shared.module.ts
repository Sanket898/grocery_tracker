import { ListCardComponent } from './list-card/list-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListModalComponent } from './list-modal/list-modal.component';



@NgModule({
  declarations: [ListCardComponent, ListModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ListCardComponent]
})
export class SharedModule { }
