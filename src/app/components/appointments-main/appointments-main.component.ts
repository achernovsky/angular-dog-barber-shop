import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-appointments-main',
  templateUrl: './appointments-main.component.html',
  styleUrls: ['./appointments-main.component.css']
})
export class AppointmentsMainComponent implements OnInit {
  appointments: Appointment[] = [
    new Appointment("Lucky", new Date("2021-12-13T18:30:00")),
    new Appointment("Oscar", new Date("2021-12-14T17:30:00")),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  loadedFeature: string = 'list'

  onFeatureSelect(feature: string) {
    this.loadedFeature = feature
  }

  onAppointmentAdded(appointment: Appointment) {
    this.appointments.push(appointment)
    this.loadedFeature = 'list'
  }
}
