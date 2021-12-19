import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  @Input() appointment: Appointment
  timeToDisplay: string
  private appsChangeSub: Subscription

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    let date = new Date(this.appointment.time)
    this.timeToDisplay = date.toString().substring(0, 21)
  }

  deleteAppointment() {
    this.appointmentService.deleteAppointment(this.appointment.id)
    .subscribe(res => {
      console.log("deleted successfullly")
      this.appointmentService.getAppointments()
      .subscribe((response: Appointment[]) => {
        this.appointmentService.appointmentsChanged.next(response)
      });
    })
  }
}
