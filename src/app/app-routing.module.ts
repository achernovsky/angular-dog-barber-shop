import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { DisplayAppointmentComponent } from './components/display-appointment/display-appointment.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'appointments', component: AppointmentsListComponent, children: [
    { path: ':id', component: DisplayAppointmentComponent },
    { path: ':id/edit', component: EditAppointmentComponent }
  ]},
  { path: 'add-appointment', component: AddAppointmentComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
