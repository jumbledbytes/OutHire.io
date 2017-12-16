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
    constructor(jsonData?: BaseModel) {
        if (jsonData) {
            this.fromJson(jsonData);
        }
    }

    /**
     * Load data into the model that has been coerced from JSON
     * 
     * @private
     * @param {BaseModel} jsonData The JSON data to load
     * @memberof BaseModel
     */
    protected fromJson(jsonData: BaseModel) {
        const keys = Object.keys(this);

        for (const key of keys) {
            if (jsonData.hasOwnProperty(key)) {
                this[key] = jsonData[key];
            }
        }
    }
}
