import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { JobApplication } from '../models/jobapplication';

/**
 * This service provides the app with all of the job application data from the
 * database
 */
@Injectable()
export class JobApplicationService {

  /** Flag indicating whether the service is connected and usable or not */
  private _isConnected : boolean = false;

  constructor(private database : DatabaseService) {

  }

  get isConnected() : boolean {
    return this._isConnected;
  }

  /**
   * Get the list of all of the applications in the database
   * 
   * @returns {Array<JobApplication>} 
   * @memberof JobApplicationService
   */
  public getApplications() : Array<JobApplication> {
    let jobApplications = this.database.findAll<JobApplication>();

    return jobApplications;
  }

  /**
   * Connect to the backend database
   * 
   * @param {string} hostName The hostname of the backend database
   * @param {string} userName The username to login with
   * @param {string} password The password to login with
   * @returns {Promise<boolean>} True if the connection was successful, false if it failed
   * @memberof JobApplicationService
   */
  public async connect(hostName : string, userName : string, password : string) : Promise<boolean> {
    if(! this.database) {
      return false;
    }
    let connectObject = {host: hostName, username: userName, password: password};
    this._isConnected = await this.database.connect(connectObject);
    return this._isConnected;
  }
}
