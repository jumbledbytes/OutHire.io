import { DatabaseModel } from "../models/databasemodel";
import { DatabaseService } from "./database.service";

/**
 * This is the interface that all data providers to the application must implement
 */
export interface ApplicationDatabase {

    /**
     * This initiates a connection to the backend database or data source
     * 
     * @param {Object} connectionInfo This object needs to provide the information required to connect, such
     *                                as hostname and credentials
     * @memberof ApplicationDatabase
     */
    connect(connectionInfo: Object);

    /**
     * Check if there is a connection to the application database
     * 
     * @returns {boolean} true of a connection is establised, false if no connection
     * @memberof ApplicationDatabase
     */
    isConnected(): boolean;

    /**
     * Get all data from the database
     * 
     * @template DataType  The type of data returned from the database
     * @param collectionName The name of the collection/table to get data from
     * @returns {Array<DataType>} The data returned from the database
     * @memberof ApplicationDatabase
     */
    findAll<DataType extends DatabaseModel>(collectionName: string): Array<DataType>;

    /**
     * Get a specific document from the database
     * 
     * @template DataType 
     * @param {string} collectionName The name of the collection/table to get the document from
     * @param {string} documentId The unique id (primary key) of the document to fetch
     * @returns {DataType} 
     * @memberof ApplicationDatabase
     */
    find<DataType extends DatabaseModel>(collectionName: string, documentId: string): DataType

    /**
     * Persist data from an object in the database
     * 
     * @param {DatabaseService} dataObject The data object to persist
     * @returns {*} This is the object (or null) returned by the actual database implementation
     * @memberof ApplicationDatabase
     */
    save(dataObject: DatabaseModel): any;

    /**
     * Revert the model back to the data that is in the database
     * 
     * @returns 
     * @memberof DatabaseModel
     */
    revert(dataObject: DatabaseModel)
}
