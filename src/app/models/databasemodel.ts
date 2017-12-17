import { ApplicationDatabase } from '../services/applicationdatabase';
import { BaseModel } from "./basemodel";
import { DatabaseService } from "../services/database.service";

/**
 * This is a base model class for all model data that comes
 * from a database
 */
export class DatabaseModel extends BaseModel {

    /** This is the backend database collection/table this data is persisted it  */
    public databaseCollection: string;

    /** This is the unique key for the document in the database */
    public _id: string;

    /** This is the raw data object retrieved from the database, used as a buffer to revert changes */
    public databaseObject: any

    /**
     * Creates an instance of DatabaseModel.
     * 
     * @memberof DatabaseModel
     */
    constructor() {
        super();
    }
}
