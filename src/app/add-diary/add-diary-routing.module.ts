import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDiaryPage } from './add-diary.page';

const routes: Routes = [
  {
    path: '',
    component: AddDiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDiaryPageRoutingModule {}
