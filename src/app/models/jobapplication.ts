import { DatabaseModel } from './databasemodel';
import { ApplicationEvent } from './applicationevent';

/**
 * This class encapsulates all of the data about a specific job application
 */
export class JobApplication extends DatabaseModel {

    /** This is the title of the job applied to */
    private jobTitle : string = "";

    /** This is the name of the company */
    private company : string = "";

    /** This is the URL to the company's website */
    private companyUrl : string = "";

    /** This is the history of this application, recording each event that has occurred during the application process */
    private applicationHistory : Array<ApplicationEvent> = new Array<ApplicationEvent>();

    /** This is the current or next event associated with the job application */
    private currentEvent : ApplicationEvent = new ApplicationEvent();

}
