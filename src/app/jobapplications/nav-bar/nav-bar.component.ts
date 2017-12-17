import { Component, OnInit } from '@angular/core';

/**
 * Simple component to display a nav bar
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  /**
   * Creates an instance of NavBarComponent.
   * 
   * @memberof NavBarComponent
   */
  constructor() { }

  /**
   * Called by Angular when it is cond constructing the component
   * 
   * @memberof NavBarComponent
   */
  ngOnInit() {
  }

}
