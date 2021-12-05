import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {
  // @Input() appointments: Appointment[]
  appointments: Appointment[]
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointments = this.appointmentService.getAppointments()
  }

  // onClick(feature: string) {
  //   this.featureSelected.emit(feature)
  // }

}
