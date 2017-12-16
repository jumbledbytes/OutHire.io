import { BaseModel } from "../models/basemodel";

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
    connect(connectionInfo : Object);

    /**
     * Check if there is a connection to the application database
     * 
     * @returns {boolean} true of a connection is establised, false if no connection
     * @memberof ApplicationDatabase
     */
    isConnected() : boolean;

    /**
     * Get all data from the database
     * 
     * @template DataType  The type of data returned from the database
     * @param collectionName The name of the collection/table to get data from
     * @returns {Array<DataType>} The data returned from the database
     * @memberof ApplicationDatabase
     */
    findAll<DataType extends BaseModel>(collectionName : string) : Array<DataType>;
}
