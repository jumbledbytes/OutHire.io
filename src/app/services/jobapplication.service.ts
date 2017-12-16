import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { JobApplication } from '../models/jobapplication';

@Injectable()
export class JobApplicationService {

  constructor(private database : DatabaseService) {

   }

  public getApplications() : Array<JobApplication> {
    let jobApplications = this.database.findAll<JobApplication>();

    return jobApplications;
  }

  public async connect(hostName : string, userName : string, password : string) : Promise<boolean> {
    if(! this.database) {
      return false;
    }
    let connectObject = {host: hostName, username: userName, password: password};
    return await this.database.connect(connectObject);
  }
}
