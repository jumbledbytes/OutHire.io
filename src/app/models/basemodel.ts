/**
 * This is the base class that all model objects should derive from
 */
export class BaseModel {
    /**
     * Creates an instance of BaseModel.
     * 
     * @param {BaseModel} [jsonData] Data to load into the model
     * @memberof BaseModel
     */
    constructor(rawData?: Object) {
        if (rawData) {
            this.load(rawData);
        }
    }

    /**
     * Load data into the model that has been coerced from JSON
     * 
     * @private
     * @param {BaseModel} jsonData The JSON data to load
     * @memberof BaseModel
     */
    public load(rawData: Object) {
        let keys = Object.keys(this);

        for (let key of keys) {
            if (rawData.hasOwnProperty(key)) {
                this[key] = rawData[key];
            }
        }
    }

    /**
     * Copy the data from the model into a raw object of some kind
     * 
     * @param {Object} rawObject The object to copy our data into
     * @memberof BaseModel
     */
    public copyTo(rawObject : Object) {
        if(! rawObject) {
            return;
        }
        let keys = Object.keys(this);
        for(let key of keys) {
            rawObject[key] = this[key];
        }
    }
}
