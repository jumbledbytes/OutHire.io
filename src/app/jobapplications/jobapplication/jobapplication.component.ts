import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobApplicationService } from '../../services/jobapplication.service';
import { JobApplication } from '../../models/jobapplication';

/**
 * This component displays all of the data associated with a job application. It also
 * allows the user to edit the data (or create a new application)
 */
@Component({
  selector: 'app-job-application',
  templateUrl: './jobapplication.component.html',
  styleUrls: ['./jobapplication.component.css']
})
export class JobApplicationComponent implements OnInit {

  /** This is the job application data we want to display */
  @Input() private jobApplication : JobApplication;

  /** This event is emitted when the job application is deleted, the event will include the id
   * of the deleted application object  */
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();


  /** Flag whether the job application data is editable or not */
  private _inEditMode : boolean = false;

  /** Flag indicating whether to show or hide this job */
  private _isHidden : boolean = false;

  /**
   * Creates an instance of JobApplicationComponent.
   * 
   * @param {JobApplicationService} jobApplicationService The job application service
   * @memberof JobApplicationComponent
   */
  constructor(private jobApplicationService : JobApplicationService) { 

  }

  /**
   * Check wheither the job application is editable or not
   * 
   * @readonly
   * @type {boolean} True if editable, false if not
   * @memberof JobApplicationComponent
   */
  get editable() : boolean {
    return this._inEditMode || ! this.jobApplication; 
  }

  /**
   * Set the component into editable mode, which makes all of the data fields editable by the user
   * 
   * @memberof JobApplicationComponent
   */
  public setEditable() {
    this._inEditMode = true;
  }

  /**
   * Hide this application
   * 
   * @memberof JobApplicationComponent
   */
  public hide() {
    this._isHidden = true;
  }

  /**
   * This will save any changes to the job application to the backend database. If the
   * job application is new then it will be a new record in the database
   * 
   * @memberof JobApplicationComponent
   */
  public save() {
    if(this.jobApplication) {
      this.jobApplicationService.database.save(this.jobApplication);
    }
    this._inEditMode = false;
  }

  /**
   * This will revert the contents of the current job application to what is stored in the database, 
   * and discard any local changes
   * 
   * @memberof JobApplicationComponent
   */
  public revert() {
    if(this.jobApplication) {
      this.jobApplicationService.database.revert(this.jobApplication);
    }
    this._inEditMode = false;
  }

  /**
   * Delete the job application from the list
   * 
   * @memberof JobApplicationComponent
   */
  public delete() {
    if(this.jobApplication) {
      this.jobApplicationService.database.delete(this.jobApplication);
      this.onDelete.emit(this.jobApplication._id);
      this._isHidden = true;
    }
  }

  /**
   * This is called by Angular when the component is fully initialized
   * 
   * @memberof JobApplicationComponent
   */
  ngOnInit() {
    // Ensure we always have a job application, if one wasn't provided then make
    // one and set the component to editable so a new job application can be added
    if(! this.jobApplication) {
      this.jobApplication = new JobApplication();
      this._inEditMode = true; // If we have an empty job application start with it being editable
    }
  }
}
