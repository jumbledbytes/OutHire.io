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

const OutHireRoutes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
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
    JobApplicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
