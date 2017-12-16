import { BaseModel } from "./basemodel";

/**
 * This is a base model class for all model data that comes
 * from a database
 */
export class DatabaseModel extends BaseModel {

    /**
     * Creates an instance of DatabaseModel.
     * 
     * @param {*} databaseObject The backend object that came from the database
     * @memberof DatabaseModel
     */
    constructor(protected databaseObject : any) {
        super();
        this.load(databaseObject);
    }

    /**
     * Persist the data back to the database it came from. The database object must have a
     * "save" function on it.
     */
    public save() {
        if(! this.databaseObject || typeof this.databaseObject["save"] !== "function") {
            return;
        }
        this.copyTo(this.databaseObject);
        this.databaseObject.save();
    }
}
