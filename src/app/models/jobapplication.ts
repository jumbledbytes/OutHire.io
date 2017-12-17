import { DatabaseModel } from './databasemodel';
import { ApplicationEvent } from './applicationevent';

/**
 * This class encapsulates all of the data about a specific job application
 */
export class JobApplication extends DatabaseModel {

    /** The name of the database collection this model is persisted in */
    static COLLECTION_NAME = "jobApplications";

    /** This is the title of the job applied to */
    private jobTitle : string = "Title";

    /** This is the name of the company */
    private company : string = "Company";

    /** This is the URL to the company's website */
    private companyUrl : string = "";

    /** This is the history of this application, recording each event that has occurred during the application process */
    private applicationHistory : Array<ApplicationEvent> = new Array<ApplicationEvent>();

    /** This is the current or next event associated with the job application */
    private currentEvent : ApplicationEvent = new ApplicationEvent();

    /**
     * Creates an instance of JobApplication. This instance is tailored to retrieve data
     * from a specific database collection
     * 
     * @memberof JobApplication
     */
    constructor() {
        super();
        this.databaseCollection = JobApplication.COLLECTION_NAME;
    }
}
