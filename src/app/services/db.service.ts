import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
// import * as internal from 'stream';

export interface CollinInterface {
  date: Date;
  totalUntilDate: number;
  totalForDate: number;
  noOf5cent: Int32Array;
  noOf10cent: Int32Array;
  noOf20cent: Int32Array;
  noOf50cent: Int32Array;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private database: SQLiteObject;

  constructor(private sqlite: SQLite) { }
  async getAllCollins() {
    let collins: CollinInterface[] = [];
    return this.sqlite.create({ name: 'dataCD.db', location: 'default' }).then(
      (db) => {
        this.database = db;
        db.executeSql(`
             CREATE TABLE IF NOT EXISTS (
               date DATE PRIMARY KEY, 
               totalUntilDate DOUBLE,
               totalForDate DOUBLE,
               noOf5cent INTEGER,
               noOf10cent INTEGER,
               noOf20cent INTEGER,
               noOf50cent INTEGER,
             )`, [])
          .catch(e => console.log(e));
        collins = this.getAllRecords();
      }
    ).catch().then((e) => {
      console.log(e);
      return collins;
    });
  }

  private getAllRecords(): CollinInterface[] {
    let collins: CollinInterface[] = [];
    this.database.executeSql('select * from ADDDIARY', []).then(
      (res) => {
        for(var x=0; x<res.rows.length; x++)
          collins.push(res.rows.item(x));
      }
    ).catch(e => {
      console.log(e);
    });
    return collins;
  }

  async addCollin(noOf5cent, noO10cent, noOf20cent, noOf50cent) {
    this.database.executeSql('insert into ADDDIARY(noOf5cent, noOf10cent, noOf20cent, noOf50cent) VALUES(?, ?, ?, ?)', [noOf5cent, 0])
      .catch(e => console.log(e));
      return this.getAllRecords(); 
  }

  async updateCollin(date: Date) {
    this.database.executeSql('UPDATE ADDDIARY WHERE DATE(now)', [date])
      .catch(e => console.log(e));
      return this.getAllRecords();
  }
  async deleteCollin(date: Date) {
    this.database.executeSql('DELETE FROM TODO WHERE DATE(now)', [date])
      .catch(e => console.log(e));
      return this.getAllRecords();
  }
   
  
}