import { Injectable } from '@angular/core';
import { ApplicationDatabase } from './applicationdatabase';
import { JobApplication } from '../models/jobapplication';

import { Database, aql } from 'arangojs';

@Injectable()
export class DatabaseService implements ApplicationDatabase {

  static DEFAULT_DATABASE_NAME : string = "OutHire.io";
  static DEFAULT_DATABASE_PORT : number = 8529;

  private _db : Database = null;

  constructor() { }

  public connect(connectionInfo: Object) : boolean {
    if(! connectionInfo || ! connectionInfo["host"] || ! connectionInfo["username"] || ! connectionInfo["password"]) {
      return false;
    }
    let host = connectionInfo["host"];
    let username = connectionInfo["username"];
    let password = connectionInfo["password"];
    let port = DatabaseService.DEFAULT_DATABASE_PORT;
    let database = DatabaseService.DEFAULT_DATABASE_NAME;
    if(connectionInfo["port"]) {
      port = connectionInfo["port"];
    }
    if(connectionInfo["database"]) {
      database = connectionInfo["database"];
    }
    this._db = new Database({
      url: `http://${username}:${password}@${host}:${port}`,
      databaseName: database
    });
    return this._db.isConnected();
  }

  public isConnected() : boolean {
    return this._db != null;
  }

  public findAll<DataType>(): Array<DataType> {
    return new Array<DataType>();
  }

}
