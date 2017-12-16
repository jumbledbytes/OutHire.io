import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';

import { JobApplicationService } from '../services/jobapplication.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Component to display and manage the login screen for OutHire.io
 * 
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** This is the username that will be used to connect to the OutHire.io server */
  private username : string;

  /** This is the password that will be used to connect to the OutHire.io server */
  private password : string;

  /** This is the server name of the OutHire.io server to connect to */
  private serverName : string;

  /** This is a flag that indicates if a login attempt failed and the user should be alerted to the failure */
  private loginAttemptFailed : boolean = false;

  /** This is the angular form control instance used to manage the login form */
  private loginFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  /** This is the angular form validation matcher */
  matcher = new LoginErrorStateMatcher();

  /**
   * Creates an instance of LoginComponent.
   * 
   * @param {JobApplicationService} jobApplicationService This is the job application service that will be used
   *                                                      to manage job applications
   * @memberof LoginComponent
   */
  constructor(private jobApplicationService : JobApplicationService) { 

  }

  /**
   * This triggered by a button press on the login page and attempts to login to the server.
   * If the login is successfull then the user will be routed to the job applications page
   * 
   * @memberof LoginComponent
   */
  public async login() {
    let connected = await this.jobApplicationService.connect(this.serverName, this.username, this.password);
    if(connected) {
      // route to job application page
    } else {
      // show login failure
      this.loginAttemptFailed = true;
    }
  }

  /**
   * Called by Angular when the login component is fully initialized
   * 
   * @memberof LoginComponent
   */
  ngOnInit() {

  }

}
