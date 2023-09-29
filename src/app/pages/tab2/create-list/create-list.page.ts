import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemFormComponent } from 'src/app/components/item-form/item-form.component';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage {

  constructor(private modalCtrl: ModalController) { }

  async viewList() {
    const modal = await this.modalCtrl.create({
      component: ItemFormComponent
    });

    await modal.present()
  }

}
