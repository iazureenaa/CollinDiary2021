import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDiaryPageRoutingModule } from './add-diary-routing.module';

import { AddDiaryPage } from './add-diary.page';
//import { Globalization } from '@ionic-native/globalization/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDiaryPageRoutingModule
  ],
  //providers: [Globalization],
  declarations: [AddDiaryPage]
})
export class AddDiaryPageModule {}
