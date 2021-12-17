import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import * as internal from 'stream';

export interface EntryDiaryInterface {
  id: number;
  date: string;
  noOfPiece: number;
  ref_piece_type_id: number;
  // totalForDate: number;
  // totalUntilDate: number;
  // noOf5Cent: number; // this is actually just to declare child property of CollinInterface, just like json
  // noOf10Cent: number;
  // noOf20Cent: number;
  // noOf50Cent: number;
}

@Injectable({
  providedIn: 'root'
})
export class CollinDatabaseService {

  database: SQLiteObject;

  constructor(private sqlite: SQLite) { }

  async initDb() {
    return this.sqlite.create({ name: 'collinDB.db', location: 'default' }).then(
      // create the necessary tables and return all records from entry_diary
      async (collinDBHandler: SQLiteObject) => {
        // get a reference to the db handler
        this.database = collinDBHandler;

        // create entry_diary table
        await collinDBHandler.executeSql(
          'CREATE TABLE IF NOT EXISTS '
          + 'entry_diary(id INTEGER PRIMARY KEY AUTOINCREMENT,'
          + ' date TEXT, no_of_piece INTEGER, ref_piece_type_id TEXT)', [])
          .then(() => console.log("entry_diary table has been created."))

          // TODO: find out why e is empty
          .catch(e => console.log(e));

        // create ref_piece_type table
        await collinDBHandler.executeSql(
          'CREATE TABLE IF NOT EXISTS '
          + 'ref_piece_type(id INTEGER PRIMARY KEY AUTOINCREMENT,'
          + ' name TEXT, cent_value INTEGER, image_url TEXT, modified_dt TEXT, type TEXT)', [])
          .then(() => console.log("ref_piece_type table has been created."))
          .catch(e => console.log(`ref_piece_type table could not be created. Encountered error: ${e}`));

        // load the existing table before receiving data
        // insert default values into ref_piece_type table
        // TODO : do not insert if table already populated
        await this.insertRefPieceType()
          .then(() => console.log("ref_piece_type table has been populated."))
          .catch(e => console.log(`ref_piece_type table could not be populated. Encountered error: ${e}`));
      }

    ).catch((e) => {
      console.log("Failed to initialize CollinDB.");
    });
  }

  // load the existing table before receiving data
  private async insertRefPieceType() {

    // default values for ref_piece_type table
    let data = [
      { name: "05cent", cent_value: 5, image_url: "", modified_dt: "", type: "coin" },
      { name: "10cent", cent_value: 10, image_url: "", modified_dt: "", type: "coin" },
      { name: "20cent", cent_value: 20, image_url: "", modified_dt: "", type: "coin" },
      { name: "50cent", cent_value: 50, image_url: "", modified_dt: "", type: "coin" }
    ];

    // insert into ref_piece_type table each row from the data
    data.forEach(async row => {
      await this.insert("ref_piece_type", row)
    });

  }

  async getAllRecords(): Promise<EntryDiaryInterface[]> {
    let collins: EntryDiaryInterface[] = [];

    let result = await this.database.executeSql('select * from entry_diary', []).catch(e => {
      console.log(e);
    });
    // TODO: check if result.rows exist before for loop
    for (var x = 0; x < result.rows.length; x++) {
      collins.push(result.rows.item(x));
    }

    return collins;
  }

  // async addCollin(noOfPiece: number, ref_piece_type_id: number) {
  //   let data = [noOfPiece, ref_piece_type_id];

  //   this.database.executeSql('insert into entry_diary(date, noOfPiece, ref_piece_type_id) VALUES(?, ?, ?)', data)
  //     .catch(e => console.log(e));
  //   return this.getAllRecords();
  // }

  // generic insert function, needs table name and records as an object
  async insert(tableName, records) {
    let sqlText; // placeholder for sql insert statement
    let values; // placeholder for sql insert values

    switch (tableName) {
      case "entry_diary":
        sqlText = "insert into entry_diary(date, no_of_piece, ref_piece_type_id) VALUES(?, ?, ?)";
        values = [records.date, records.no_of_piece, records.ref_piece_type_id];
        break;

      case "ref_piece_type":
        sqlText = "insert into ref_piece_type(name, cent_value, image_url, modified_dt, type) VALUES(?, ?, ?, ?, ?)";
        values = [records.name, records.cent_value, records.image_url, records.modified_dt, records.type];
        break;

      default:
        return;
    }

    return this.database.executeSql(sqlText, values);
  }

  async updateCollin(id: number) {
    this.database.executeSql('UPDATE entry_diary WHERE ID=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async deleteCollin(id: number) {
    this.database.executeSql('DELETE FROM entry_diary WHERE ID=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

}



