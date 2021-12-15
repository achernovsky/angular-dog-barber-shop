import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppointmentsMainComponent } from './components/appointments-main/appointments-main.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { DisplayAppointmentComponent } from './components/display-appointment/display-appointment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppointmentsMainComponent,
    AppointmentsListComponent,
    AppointmentComponent,
    AddAppointmentComponent,
    EditAppointmentComponent,
    DisplayAppointmentComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
