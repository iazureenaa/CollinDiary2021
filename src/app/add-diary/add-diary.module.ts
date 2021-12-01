import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDiaryPageRoutingModule } from './add-diary-routing.module';

import { AddDiaryPage } from './add-diary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDiaryPageRoutingModule
  ],
  declarations: [AddDiaryPage]
})
export class AddDiaryPageModule {}
