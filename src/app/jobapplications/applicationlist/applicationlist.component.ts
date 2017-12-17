import { Component, DoCheck, OnInit } from '@angular/core';
import { JobApplicationService } from '../../services/jobapplication.service';
import { JobApplication } from '../../models/jobapplication';

/**
 * This componenent renders a list of applications
 */
@Component({
  selector: 'app-application-list',
  templateUrl: './applicationlist.component.html',
  styleUrls: ['./applicationlist.component.css']
})
export class ApplicationListComponent implements OnInit {

  /** This list of applications to display  */
  private applicationList : Array<JobApplication>;

  /** Flag to indicate that the application list changed and Angular should re-render */
  private listUpdated : boolean = false;

  constructor(private jobApplicationService : JobApplicationService) { }

  /**
   * Called by Angular when it is finished initializing the component
   * 
   * @memberof ApplicationListComponent
   */
  ngOnInit() {
    this.loadApplicationList();
  }

  /**
   * Called by Angular periodically to let it know when the underlying data structures changed
   * and it needs to re-render the screen
   * 
   * @returns 
   * @memberof ApplicationListComponent
   */
  ngDoCheck() {
    let updated = this.listUpdated;
    this.listUpdated = false;
    return updated;
  }

  /**
   * Load the list of applications from the database
   * 
   * @private
   * @memberof ApplicationListComponent
   */
  private async loadApplicationList() {
    this.applicationList = await this.jobApplicationService.getApplications();
    this.listUpdated = true;
  }

}
