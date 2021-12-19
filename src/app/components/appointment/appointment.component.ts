import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  @Input() appointment: Appointment
  timeToDisplay: string

  constructor() { }

  ngOnInit(): void {
    let date = new Date(this.appointment.time)
    this.timeToDisplay = date.toString().substring(0, 21)
  }
}
