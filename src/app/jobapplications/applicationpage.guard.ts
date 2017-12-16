import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JobApplicationService } from '../services/jobapplication.service';
import { Router } from '@angular/router';

/**
 * This guard prevents someone from navigating to the job application page unless
 * they have successfully logged into the system first
 */
@Injectable()
export class ApplicationPageGuard implements CanActivate {

  /**
   * Creates an instance of ApplicationpageGuard.
   * 
   * @param {JobApplicationService} jobApplicationService The job service used to verify authentication complete
   * @param {Router} router The router to use to send the user back to the login page if they aren't authenticated
   * @memberof ApplicationpageGuard
   */
  constructor(private jobApplicationService : JobApplicationService, private router : Router) {

  }

  /**
   * Called by Angular when an attempt to navigate to the application page is made.
   * 
   * @param {ActivatedRouteSnapshot} next 
   * @param {RouterStateSnapshot} state 
   * @returns {(Observable<boolean> | Promise<boolean> | boolean)} 
   * @memberof ApplicationpageGuard
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.jobApplicationService.isConnected) {
        this.router.navigate(['login']);
        return false;
      }
    return true;
  }
}
