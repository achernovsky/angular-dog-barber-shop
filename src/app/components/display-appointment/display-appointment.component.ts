import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-display-appointment',
  templateUrl: './display-appointment.component.html',
  styleUrls: ['./display-appointment.component.css']
})

export class DisplayAppointmentComponent implements OnInit {
  id: number
  appointment: Appointment = new Appointment
  timeToDisplay: string
  createdAtToDisplay: string

  constructor(private route: ActivatedRoute, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id']
    this.appointmentService.getAppointmentById(this.id)
    .subscribe((response: Appointment) => {
      this.appointment = response
      let date = new Date(this.appointment.time)
      this.timeToDisplay = date.toString().substring(0, 21)
      let createDate = new Date(this.appointment.createdAt)
      this.createdAtToDisplay = createDate.toString().substring(0, 21)
    });
  }
}
