import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointments-main',
  templateUrl: './appointments-main.component.html',
  styleUrls: ['./appointments-main.component.css'],
  providers: [AppointmentService]
})
export class AppointmentsMainComponent implements OnInit {
  appointments: Appointment[]
  loadedFeature: string = 'list'

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointments = this.appointmentService.getAppointments()
  }

  onFeatureSelect(feature: string) {
    this.loadedFeature = feature
  }

  onAppointmentAdded(appointment: Appointment) {
    //this.appointments.push(appointment)
    this.loadedFeature = 'list'
  }
}
