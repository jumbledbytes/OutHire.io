import { Component, Input, OnInit } from '@angular/core';
import { JobApplication } from '../../models/jobapplication';

@Component({
  selector: 'app-application-attribute',
  templateUrl: './applicationattribute.component.html',
  styleUrls: ['./applicationattribute.component.css']
})
export class ApplicationAttributeComponent implements OnInit {

  /** This is the name of the attribute to display */
  @Input() attributeName : string;

  /** User friendly text for the attribute */
  @Input() attributeTitle : string;

  /** This is the job application to get the attribute value from */
  @Input() jobApplication : JobApplication;

  /** Flag whether the job attribute data is editable or not */
  @Input() editable : boolean = false;

  /**
   * Creates an instance of ApplicationAttributeComponent.
   * 
   * @memberof ApplicationAttributeComponent
   */
  constructor() { 

  }

  /**
   * Get the value of the attribute
   * 
   * @type {string} 
   * @memberof ApplicationAttributeComponent
   */
  get value() : string {
    if(this.jobApplication.hasOwnProperty(this.attributeName)) {
      return this.jobApplication[this.attributeName];
    }
    return "";
  }

  /**
   * Set the value of the attribute
   * 
   * @memberof ApplicationAttributeComponent
   */
  set value(newValue : string) {
    if(this.jobApplication.hasOwnProperty(this.attributeName)) {
      this.jobApplication[this.attributeName] = newValue;
    }
  }

  /**
   * This is called by Angular when it is done constructing the component
   * 
   * @memberof ApplicationAttributeComponent
   */
  ngOnInit() {

  }

}
