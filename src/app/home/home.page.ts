import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCntrl: NavController) {}
  goToAddDiaryPage()
    {
      this.navCntrl.navigateForward('/add-diary');
    }

    goToHistoryPage()
    {
      this.navCntrl.navigateForward('/history');
    }
}
