import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'

import { AppComponent } from './app.component';
import { DatabaseService } from './services/database.service';
import { JobApplicationService } from './services/jobapplication.service';
import { LoginComponent } from './login/login.component';
import { ApplicationListComponent } from './jobapplications/applicationlist/applicationlist.component';
import { JobApplicationComponent } from './jobapplications/jobapplication/jobapplication.component';
import { ApplicationPageComponent } from './jobapplications/applicationpage/applicationpage.component';
import { ApplicationPageGuard } from './jobapplications/applicationpage.guard';
import { NavBarComponent } from './jobapplications/nav-bar/nav-bar.component';
import { ApplicationAttributeComponent } from './jobapplications/applicationattribute/applicationattribute.component';

const OutHireRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'applications', component: ApplicationPageComponent, canActivate: [ApplicationPageGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApplicationListComponent,
    JobApplicationComponent,
    ApplicationPageComponent,
    NavBarComponent,
    ApplicationAttributeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,

    RouterModule.forRoot(OutHireRoutes)
  ],
  providers: [
    DatabaseService,
    JobApplicationService,
    ApplicationPageGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
