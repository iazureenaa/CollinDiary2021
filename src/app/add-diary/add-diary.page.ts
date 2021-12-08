import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
// import { DbService, CollinInterface } from '../services/db.service';

@Component({
  selector: 'app-add-diary',
  templateUrl: './add-diary.page.html',
  styleUrls: ['./add-diary.page.scss'],
})
export class AddDiaryPage implements OnInit {

  // collins: CollinInterface[];

  pieceInput05 = 0;
  pieceInput10 = 0;
  pieceInput20 = 0;
  pieceInput50 = 0;
  totalValue05 = 0.00;
  totalValue10 = 0.00;
  totalValue20 = 0.00;
  totalValue50 = 0.00;
  todayDate = "";
  totalForDateValue = 0.00;
  totalUntilDateValue = 0.00;


  // constructor(public navCntrl: NavController, private dbService: DbService) { }
  constructor(public navCntrl: NavController) { }

  // ionViewDidEnter() {
  //   this.todayDate = "";
  //   this.dbService.getAllCollins().then(data => this.collins = data);
  // }

  // addCollin(noOf5cent, noO10cent, noOf20cent, noOf50cent) {
  //   this.dbService.addCollin(noOf5cent, noO10cent, noOf20cent, noOf50cent).then(data => {
  //     this.collins = data;
  //   });
  // }

  // updateCollin(date: Date) {
  //   this.dbService.updateCollin(date)
  //     .then(data => this.collins = data);
  // }

  // deleteCollin(date: Date) {
  //   this.dbService.deleteCollin(date)
  //     .then(data => this.collins = data);
  // }

  goToHomePage() {
    this.navCntrl.navigateBack('/home');
  }

  ngOnInit() {
  }

  todayDateDisplay() {
    return moment().format("Do MMM YYYY");
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
    this.totalForDateValue = this.totalValue05 + this.totalValue10 + this.totalValue20 + this.totalValue50;
  }
}
