import { Component, Input, OnInit } from '@angular/core';
import { JobApplication } from '../../models/jobapplication';
import { ApplicationState } from '../../models/applicationstate';
import { ApplicationEvent } from '../../models/applicationevent';
import { JobApplicationService } from '../../services/jobapplication.service';
import { ApplicationDatabase } from '../../services/applicationdatabase';

/**
 * THis component displays the state of a job application. It can also display
 * historical state of the application
 */
@Component({
  selector: 'app-application-state',
  templateUrl: './applicationstate.component.html',
  styleUrls: ['./applicationstate.component.css']
})
export class ApplicationStateComponent implements OnInit {

  /** The job application this shows state for */
  @Input() currentEvent : ApplicationEvent;

  /** Flag whether the job attribute data is editable or not */
  @Input() editable : boolean = false;

  /** List of available application states the user can choose from */
  private availableStates : Array<string> = new Array<string>();

  /** The current selected application state */
  private currentState : string = "";

  /** The data the application state was changed to its current state */
  private currentDate : string;

  /**
   * Creates an instance of ApplicationStateComponent.
   * 
   * @memberof ApplicationStateComponent
   */
  constructor() { }

  /**
   * Called by Angular when it is done initializing the component
   * 
   * @memberof ApplicationStateComponent
   */
  ngOnInit() {
    if(this.currentEvent) {
      this.currentState = this.currentEvent.eventStatus;
      if(this.currentEvent.eventDate) {
        this.currentDate = new Date(this.currentEvent.eventDate).toDateString();
      }
    }
    this.availableStates = Object.keys(ApplicationState).map(key => ApplicationState[key]).filter(value => typeof value === 'string') as string[];
  }

  /**
   * Set the current application state based on a user selection
   * 
   * @param {string} newState The new state
   * @memberof ApplicationStateComponent
   */
  public setCurrentState(newState : string) {
    if(this.currentEvent.eventStatus == newState) {
      return;
    }
    this.currentEvent.eventDate = new Date();
    this.currentEvent.eventStatus = newState;
    this.currentState = newState;
    this.currentDate = this.currentEvent.eventDate.toDateString();
  }

}
