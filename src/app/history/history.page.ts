import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  myDate = 'Date:';
  datePickerObj: any = {
    mondayFirst: true,
  };
  selectedDate;

  // var for i18n
  public Total_Balance: string;
  public Select_Date: string;
  public Debit: string;
  public Credit: string;
  public No_Transaction: string;
  public Button_Back: string;

  no_of_piece = 0;
  cent_value = 0;
  total_Debit = 0;
  total_Credit = 0;
  no_Transaction = false;

  constructor(
    public modalCtrl: ModalController,
    public navCntrl: NavController,
    private globalization: Globalization,
    private _translate: TranslateService
  ) {
    this._translate.use('ms');
    this._initialiseTranslation();
  }

  _initialiseTranslation(): void {
    this._translate.get('Select_Date').subscribe((res: string) => {
      this.Select_Date = res;
    });
    this._translate.get('Total_Balance').subscribe((res: string) => {
      this.Total_Balance = res;
    });
    this._translate.get('Debit').subscribe((res: string) => {
      this.Debit = res;
    });
    this._translate.get('Credit').subscribe((res: string) => {
      this.Credit = res;
    });
    this._translate.get('No_Transaction').subscribe((res: string) => {
      this.No_Transaction = res;
    });
    this._translate.get('Button_Back').subscribe((res: string) => {
      this.Button_Back = res;
    });
  }

  goToHomePage() {
    this.navCntrl.navigateBack('/home');
  }
  ngOnInit() {
    this.datePickerObj = {
      dateFormat: 'YYYY-MM-DD',
    };
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: {
        objConfig: this.datePickerObj,
        selectedDate: this.selectedDate,
      },
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss().then((data) => {
      console.log(data);
      this.selectedDate = data.data.date;
    });
  }

  // logic calculation functions

  totalDebit() {
    if (this.no_of_piece < 0) {
      this.total_Debit = this.no_of_piece * this.cent_value;
    }
  }

  totalCredit() {
    if (this.no_of_piece > 0) {
      this.total_Credit = this.no_of_piece * this.cent_value;
    }
  }

  noTransaction() {
    if (this.total_Debit == 0 && this.total_Credit == 0) {
      this.no_Transaction = true;
    }
  }
}
