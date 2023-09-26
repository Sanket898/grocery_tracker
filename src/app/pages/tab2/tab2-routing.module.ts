import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'create',
    loadChildren: () => import('./create-list/create-list.module').then(m => m.CreateListPageModule)
  },
  {
    path: 'view-list',
    loadChildren: () => import('./view-list/view-list.module').then( m => m.ViewListPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule { }
