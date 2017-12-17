import { ApplicationState } from "./applicationstate";
import { BaseModel } from "./basemodel";

/**
 * This model class contains information about a specific event that occurred or needs
 * to occur for the job application
 */
export class ApplicationEvent extends BaseModel {

    /** This is the date the event occurred, or if in the future is scheduled to occur */
    public eventDate : Date = new Date();

    /** This is the status of the application at the time of the event */
    public eventStatus : string = "";

    /** This describes the event or provides extra information about the event */
    public eventNote : string = "";

    constructor(jsonData? : ApplicationEvent) {
        super(jsonData);
        if(! this.eventStatus) {
            this.eventStatus = ApplicationState.NOT_DEFINED.toString();
        }
    }

}
