import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import * as internal from 'stream';

export interface CollinInterface {
  id: number;
  date: Date;
  totalForDate: number;
  totalUntilDate: number;
  noOf5Cent: number; // this is actually just to declare child property of CollinInterface, just like json
  noOf10Cent: number;
  noOf20Cent: number;
  noOf50Cent: number;
}

@Injectable({
  providedIn: 'root'
})
export class CollinDatabaseService {

  database: SQLiteObject;
  
  constructor(private sqlite: SQLite) { }

  async getAllCollins() {
    let collins: CollinInterface[] = [];

    return this.sqlite.create({ name: 'collinDB.db', location: 'default' }).then(
      async (collinDBHandler : SQLiteObject) => {       
        this.database = collinDBHandler;

        collinDBHandler.executeSql(
          'CREATE TABLE IF NOT EXISTS '
          + 'ADDDIARY(id INTEGER PRIMARY KEY AUTOINCREMENT,'
          + ' date DATE, totalForDate DOUBLE, totalUntilDate DOUBLE, noOf5cent INTEGER, noOf10cent INTEGER, noOf20cent INTEGER, noOf50cent INTEGER)', [])
          .catch(e => console.log("CollinDB has been created."));
        collins = await this.getAllRecords();
        return collins;
      }
    ).catch((e) => {
      console.log("Failed to create CollinDB.");
      return collins;
    });
  }

  private async getAllRecords(): Promise<CollinInterface[]> {
    let collins: CollinInterface[] = [];

    let result = await this.database.executeSql('select * from ADDDIARY', []).catch(e => {
      console.log(e);
    });

    for(var x=0; x<result.rows.length; x++){ 
      collins.push(result.rows.item(x));
    }

    return collins;
  }

  async addCollin(noOf5Cent: number, noOf10Cent: number, noOf20Cent: number, noOf50Cent: number) {
    let data = [noOf5Cent, noOf10Cent, noOf20Cent, noOf50Cent];

    this.database.executeSql('insert into ADDDIARY(noOf5Cent, noOf10Cent, noOf20Cent, noOf50Cent) VALUES(?, ?, ?, ?)', data)
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async updateCollin(id: number) {
    this.database.executeSql('UPDATE ADDDIARY WHERE ID=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async deleteCollin(id: number) {
    this.database.executeSql('DELETE FROM ADDDIARY WHERE ID=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

}


