import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  myDate = 'Date:';
  datePickerObj: any = {
    mondayFirst: true
  };
  selectedDate;

  constructor(public modalCtrl: ModalController, public navCntrl: NavController) { }
  goToHomePage()
  {
    this.navCntrl.navigateBack('/home');
  }
  ngOnInit() {
    this.datePickerObj = {
      dateFormat: 'YYYY-MM-DD'
    };
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: {
        'objConfig': this.datePickerObj,
        'selectedDate': this.selectedDate
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.selectedDate = data.data.date;
      });
  }

}

