import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { JobApplication } from '../models/jobapplication';
import { ApplicationDatabase } from './applicationdatabase';

/**
 * This service provides the app with all of the job application data from the
 * database
 */
@Injectable()
export class JobApplicationService {

  static JOB_APPLICATION_COLLECTION = "jobApplications";

  /** Flag indicating whether the service is connected and usable or not */
  private _isConnected : boolean = false;

  /**
   * Creates an instance of JobApplicationService.
   * 
   * @param {DatabaseService} _database The database to use for job application data
   * @memberof JobApplicationService
   */
  constructor(private _database : DatabaseService) {

  }

  /**
   * Check if the service is successfully connected to the backend database
   */
  get isConnected() : boolean {
    return this._isConnected;
  }

  /**
   * Get the application database this service is using
   */
  get database() : ApplicationDatabase {
    return this._database;
  }

  /**
   * Get the list of all of the applications in the database
   * 
   * @returns {Array<JobApplication>} 
   * @memberof JobApplicationService
   */
  public getApplications() : Array<JobApplication> {
    let jobApplications = this._database.findAll<JobApplication>(JobApplicationService.JOB_APPLICATION_COLLECTION);

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
    if(! this._database) {
      return false;
    }
    let connectObject = {host: hostName, username: userName, password: password};
    this._isConnected = await this._database.connect(connectObject);
    return this._isConnected;
  }
}
