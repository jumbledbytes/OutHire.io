import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



import { AppComponent } from './app.component';
import { DatabaseService } from './services/database.service';
import { JobApplicationService } from './services/jobapplication.service';
import { LoginComponent } from './login/login.component';
import { ApplicationListComponent } from './jobapplications/applicationlist/applicationlist.component';
import { JobApplicationComponent } from './jobapplications/jobapplication/jobapplication.component';
import { ApplicationPageComponent } from './jobapplications/applicationpage/applicationpage.component';
import { ApplicationPageGuard } from './jobapplications/applicationpage.guard';

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
    ApplicationPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatInputModule,

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
