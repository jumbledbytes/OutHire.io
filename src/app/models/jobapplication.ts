import { DatabaseModel } from './databasemodel';
import { ApplicationEvent } from './applicationevent';

/**
 * This class encapsulates all of the data about a specific job application
 */
export class JobApplication extends DatabaseModel {

    /** The name of the database collection this model is persisted in */
    static COLLECTION_NAME = "jobApplications";

    /** This is the title of the job applied to */
    public jobTitle : string = "Title";

    /** This is the name of the company */
    public company : string = "Company";

    /** This is the URL to the company's website */
    public companyUrl : string = "";

    /** This is the URL to the job posting */
    public applicationUrl : string = "";

    /** This is the name of the recruiter */
    public recruiterName : string = "";

    /** This is the email of the recruiter */
    public recruiterEmail : string = "";

    /** This is the email of the recruiter */
    public recruiterPhone : string = "";

    /** This is the history of this application, recording each event that has occurred during the application process */
    public applicationHistory : Array<ApplicationEvent> = new Array<ApplicationEvent>();

    /** This is the current or next event associated with the job application */
    public currentEvent : ApplicationEvent = new ApplicationEvent();

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
