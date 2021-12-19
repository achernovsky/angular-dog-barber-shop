import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {
  appointments: Appointment[] = []
  private appsChangeSub: Subscription
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointments()
      .subscribe((response: Appointment[]) => {
        this.appointments = response
      });
    
    this.appsChangeSub = this.appointmentService.appointmentsChanged
    .subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments
      }
    )
  }

  ngOnDestroy(): void {
    this.appsChangeSub.unsubscribe()
  }
}
