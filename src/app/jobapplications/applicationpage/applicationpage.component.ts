import { Component, OnInit } from '@angular/core';

/**
 * This is the top level component on the application page. All applications are displayed in this component
 */
@Component({
  selector: 'app-application-page',
  templateUrl: './applicationpage.component.html',
  styleUrls: ['./applicationpage.component.css']
})
export class ApplicationPageComponent implements OnInit {

  /**
   * Creates an instance of ApplicationPageComponent.
   * 
   * @memberof ApplicationPageComponent
   */
  constructor() { }

  /**
   * This is called by Angular when it is done constructing the component
   * 
   * @memberof ApplicationPageComponent
   */
  ngOnInit() {

  }



}
