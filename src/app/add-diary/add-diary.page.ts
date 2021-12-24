import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
// import { DbService, CollinInterface } from '../services/db.service';

import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {
  CollinDatabaseService,
  EntryDiaryInterface,
} from '../services/collin-database.service';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-diary',
  templateUrl: './add-diary.page.html',
  styleUrls: ['./add-diary.page.scss'],
})
export class AddDiaryPage implements OnInit {
  // collins: CollinInterface[];
  public Label_5Cent: string;
  public Label_10Cent: string;
  public Label_20Cent: string;
  public Label_50Cent: string;
  public Label_Piece: string;
  public Label_Total: string;
  public Label_Total_For: string;
  public Label_Total_Until: string;
  public Button_Back: string;
  public Button_Save: string;
  public AddDiary_Title: string;
  public Data_Is_Saved: string;

  pieceInput05 = 0;
  pieceInput10 = 0;
  pieceInput20 = 0;
  pieceInput50 = 0;
  totalValue05 = 0.0;
  totalValue10 = 0.0;
  totalValue20 = 0.0;
  totalValue50 = 0.0;
  todayDate = '';
  totalForDateValue = 0.0;
  totalUntilDateValue = 0.0;
  noOfPiece = 0;
  ref_piece_type_id = 0;

  collinInput: string;
  collins: EntryDiaryInterface[];

  constructor(
    public navCntrl: NavController,
    private globalization: Globalization,
    private _translate: TranslateService,
    private collinDatabaseService: CollinDatabaseService,
    public toastCtrl: ToastController
  ) {
    // this._translate.use('ms');
    this._initialiseTranslation();
  }

  ionViewDidEnter(): void {
    this.collinInput = '';
    this.collinDatabaseService.initDb().then(() => {
      this.collinDatabaseService
        .getAllRecords()
        .then((data) => (this.collins = data));
    });
  }

  // i18n functions
  _initialiseTranslation(): void {
    this._translate.get('AddDiary_Title').subscribe((res: string) => {
      this.AddDiary_Title = res;
    });
    this._translate.get('Label_5Cent').subscribe((res: string) => {
      this.Label_5Cent = res;
    });
    this._translate.get('Label_10Cent').subscribe((res: string) => {
      this.Label_10Cent = res;
    });
    this._translate.get('Label_20Cent').subscribe((res: string) => {
      this.Label_20Cent = res;
    });
    this._translate.get('Label_50Cent').subscribe((res: string) => {
      this.Label_50Cent = res;
    });
    this._translate.get('Label_Piece').subscribe((res: string) => {
      this.Label_Piece = res;
    });
    this._translate.get('Label_Total').subscribe((res: string) => {
      this.Label_Total = res;
    });
    this._translate.get('Label_Total_For').subscribe((res: string) => {
      this.Label_Total_For = res;
    });
    this._translate.get('Label_Total_Until').subscribe((res: string) => {
      this.Label_Total_Until = res;
    });
    this._translate.get('Button_Back').subscribe((res: string) => {
      this.Button_Back = res;
    });
    this._translate.get('Button_Save').subscribe((res: string) => {
      this.Button_Save = res;
    });
    this._translate.get('Data_Is_Saved').subscribe((res: string) => {
      this.Data_Is_Saved = res;
    });
  }

  // navigate functions
  goToHomePage() {
    this.navCntrl.navigateBack('/home');
  }

  ngOnInit() {}

  // logic calculation functions
  todayDateDisplay() {
    return moment().format('Do MMM YYYY');
  }

  increment5CentPiece() {
    this.pieceInput05++;
  }

  increment10CentPiece() {
    this.pieceInput10++;
  }

  increment20CentPiece() {
    this.pieceInput20++;
  }

  increment50CentPiece() {
    this.pieceInput50++;
  }

  decrement5CentPiece() {
    this.pieceInput05--;
  }

  decrement10CentPiece() {
    this.pieceInput10--;
  }

  decrement20CentPiece() {
    this.pieceInput20--;
  }

  decrement50CentPiece() {
    this.pieceInput50--;
  }

  autoCalculateTotal5Cent() {
    this.totalValue05 = (this.pieceInput05 * 5) / 100;
    this.autoCalculateGrandTotalForDate();
  }

  autoCalculateTotal10Cent() {
    this.totalValue10 = (this.pieceInput10 * 10) / 100;
    this.autoCalculateGrandTotalForDate();
  }

  autoCalculateTotal20Cent() {
    this.totalValue20 = (this.pieceInput20 * 20) / 100;
    this.autoCalculateGrandTotalForDate();
  }

  autoCalculateTotal50Cent() {
    this.totalValue50 = (this.pieceInput50 * 50) / 100;
    this.autoCalculateGrandTotalForDate();
  }

  update5CentPiece(newValue) {
    this.pieceInput05 = newValue;
    this.autoCalculateTotal5Cent();
  }

  update10CentPiece(newValue) {
    this.pieceInput10 = newValue;
    this.autoCalculateTotal10Cent();
  }

  update20CentPiece(newValue) {
    this.pieceInput20 = newValue;
    this.autoCalculateTotal20Cent();
  }

  update50CentPiece(newValue) {
    this.pieceInput50 = newValue;
    this.autoCalculateTotal50Cent();
  }

  autoCalculateGrandTotalForDate() {
    this.totalForDateValue =
      this.totalValue05 +
      this.totalValue10 +
      this.totalValue20 +
      this.totalValue50;
  }

  // sqlite functions
  addCollin() {
    // this is function param, it will expect some data assignment. so need to check function caller, in our case function caller is in html
    //here we check further any noOf5Cent variable declared or not in other function. xde and only located in our function definition.
    //now we use our another dev friend, -> project finder. ctrl+shift+f
    //here we search what does noOf5cent meant to be used by dev?

    // so we saw got in db service

    let row = {
      date: this.todayDate,
      no_of_piece: this.noOfPiece,
      ref_piece_type_id: this.ref_piece_type_id,
    };
    // now we will test our diagnosis, if cure method is accurate
    this.collinDatabaseService.insert('entry_diary', row).then((data) => {
      this.collins = data;
      this.collinInput = '';
    });
    console.log('Collins data:' + this.collins);
    // window.location.reload();
  }

  deleteCollin(id: number) {
    this.collinDatabaseService
      .deleteCollin(id)
      .then((data) => (this.collins = data));
  }

  updateCollin(id: number) {
    this.collinDatabaseService
      .updateCollin(id)
      .then((data) => (this.collins = data));
  }

  async openToast() {
    const toast = await this.toastCtrl.create({
      message: this.Data_Is_Saved,
      duration: 4000,
    });
    toast.present();
  }
}
