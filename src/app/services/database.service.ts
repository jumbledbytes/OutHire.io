import { Injectable } from '@angular/core';
import { ApplicationDatabase } from './applicationdatabase';
import { JobApplication } from '../models/jobapplication';

import { Database, aql } from 'arangojs';

/**
 * This class is a service to the raw data coming from a backend database. In this
 * instance the backend database is ArangoDB
 */
@Injectable()
export class DatabaseService implements ApplicationDatabase {

  static DEFAULT_DATABASE_NAME: string = "OutHire";
  static DEFAULT_DATABASE_PORT: number = 8529;

  /** This is the backend database used to persist and retrieve all data */
  private _db: Database = null;

  /** This stores a list of all the data collections in the backend database */
  private collectionList;

  /**
   * Creates an instance of DatabaseService.
   * @memberof DatabaseService
   */
  constructor() { }

  /**
   * Attempt to connect to the backend database
   * 
   * @param {Object} connectionInfo Object containing connection info
   * @returns {Promise<boolean>} This call is asynchronous, callers must call await on it to resolve the promise
   * @memberof DatabaseService
   */
  public async connect(connectionInfo: Object): Promise<boolean> {
    if (!connectionInfo || !connectionInfo["host"] || !connectionInfo["username"] || !connectionInfo["password"]) {
      return false;
    }

    // Extract out connection info
    let host = connectionInfo["host"];
    let username = connectionInfo["username"];
    let password = connectionInfo["password"];
    let port = DatabaseService.DEFAULT_DATABASE_PORT;
    let database = DatabaseService.DEFAULT_DATABASE_NAME;
    if (connectionInfo["port"]) {
      port = connectionInfo["port"];
    }
    if (connectionInfo["database"]) {
      database = connectionInfo["database"];
    }

    // Connect to the database
    this._db = new Database({
      url: `http://${username}:${password}@${host}:${port}`,
      databaseName: database
    });

    // Verify the connection is valid by retrieving the list of collections from the database
    this.collectionList = await this._db.listCollections();
    return this.collectionList !== undefined && this.collectionList != null;
  }

  /**
   * Check if we are connected to the backend database
   * 
   * @returns {boolean} True if we successfully connected, false if not
   * @memberof DatabaseService
   */
  public isConnected(): boolean {
    return this.collectionList !== undefined && this.collectionList != null;
  }

  /**
   * Final all documents in the database
   * 
   * @template DataType 
   * @param collectionName The name of the collection/table to retreive data from
   * @returns {Array<DataType>} All of the data in the requested collection/table
   * @memberof DatabaseService
   */
  public findAll<DataType>(collectionName : string): Array<DataType> {
    return new Array<DataType>();
  }

}
