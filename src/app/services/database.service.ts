import { Injectable } from '@angular/core';
import { ApplicationDatabase } from './applicationdatabase';
import { JobApplication } from '../models/jobapplication';

import { Database, aql } from 'arangojs';
import { DatabaseModel } from '../models/databasemodel';

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
  public async findAll<DataType extends DatabaseModel>(dataTypeClass: { new (...args: any[]): DataType}, collectionName: string): Promise<Array<DataType>> {
    let collectionContents  = new Array<DataType>();

    // Get all of the raw results from the database
    let cursor = await this._db.collection(collectionName).all();

    // Convert the raw results into model objects and save them in the list that is returned
    await cursor.each((dbResult) => {
      let result = new dataTypeClass();
      result.databaseCollection = collectionName;
      result.load(dbResult);
      result._id = dbResult._id;
      collectionContents.push(result);
    });

    return collectionContents;
  }

  /**
   * Get a specific document from the database
   * 
   * @template DataType 
   * @param {string} collectionName The name of the collection/table to get the document from
   * @param {string} documentId The unique id (primary key) of the document to fetch
   * @returns {DataType} 
   * @memberof ApplicationDatabase
   */
  public async find<DataType extends DatabaseModel>(dataTypeClass: { new (...args: any[]): DataType}, collectionName: string, documentId: string): Promise<DataType> {
    let result = new dataTypeClass();

    let document = this._db.collection(collectionName).document(documentId);
    result.databaseCollection = collectionName;
    result.load(document);
    result._id = document._id;
    
    return result;
  }

  /**
   * Persist data from an object in the database
   * 
   * @param {DatabaseService} dataObject The data object to persist
   * @returns {*} This is the object (or null) returned by the actual database implementation
   * @memberof ApplicationDatabase
   */
  public async save(dataObject: DatabaseModel): Promise<any> {
    if (!this.isConnected() || !dataObject) {
      return null;
    }

    let documentCollection = dataObject.databaseCollection;
    let documentInfo = null;
    if(dataObject._id) {
      // The document exists so replace the existing document
      documentInfo = await this._db.collection(documentCollection).replace(dataObject._id, dataObject);
    } else {
      documentInfo = await this._db.collection(documentCollection).save(dataObject);
      dataObject._id = documentInfo._id;
    }
    return documentInfo;
  }

  /**
   * Revert the model back to the data that is in the database
   * 
   * @returns 
   * @memberof DatabaseModel
   */
  public revert(dataObject: DatabaseModel) {
    if (!this.isConnected() || !dataObject || !dataObject._id) {
      return;
    }
    let documentCollection = dataObject.databaseCollection;
    let oldDocument = this._db.collection(documentCollection).document(dataObject._id)
    dataObject.load(oldDocument);
  }

  /**
   * Delete a record from the database
   * 
   * @param {DatabaseModel} dataObject The object containing the data to delete from the database
   * @returns 
   * @memberof DatabaseService
   */
  public async delete(dataObject: DatabaseModel) {
    if(! this.isConnected() || ! dataObject || ! dataObject._id) {
      return;
    }
    let documentCollection = dataObject.databaseCollection;
    this._db.collection(documentCollection).remove(dataObject._id);
  }
}
