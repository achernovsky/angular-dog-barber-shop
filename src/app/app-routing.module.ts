import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { DisplayAppointmentComponent } from './components/display-appointment/display-appointment.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentsListComponent, children: [
    { path: ':id', component: DisplayAppointmentComponent },
    { path: ':id/edit', component: EditAppointmentComponent }
  ]},
  { path: 'add-appointment', component: AddAppointmentComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
