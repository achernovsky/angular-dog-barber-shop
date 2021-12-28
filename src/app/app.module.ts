import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppointmentsMainComponent } from './components/appointments-main/appointments-main.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { DisplayAppointmentComponent } from './components/display-appointment/display-appointment.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { MainBannerComponent } from './components/main-banner/main-banner.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';

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
    PageNotFoundComponent,
    LoginPageComponent,
    LoadingSpinnerComponent,
    RegisterPageComponent,
    MainBannerComponent,
    HomePageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
