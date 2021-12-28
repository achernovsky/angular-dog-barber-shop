import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {
  keyword: string = ""
  keydate: Date = new Date(0)
  keydateDefaultStr = new Date(0).toString()
  appointments: Appointment[] = []
  isLoading: boolean = false
  isLoggedIn: boolean = false
  private userSub: Subscription
  private appsChangeSub: Subscription
  private appointmentSub: Subscription

  constructor(private appointmentService: AppointmentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user
    })
    this.isLoading = true
    this.appointmentSub = this.appointmentService.getAppointments()
      .subscribe((response: Appointment[]) => {
        this.appointments = response
        this.sortAppointments()
        this.isLoading = false
      });
    
    this.appsChangeSub = this.appointmentService.appointmentsChanged
    .subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments
        this.sortAppointments()
      }
    )
  }

  ngOnDestroy(): void {
    this.appsChangeSub.unsubscribe()
    this.appointmentSub.unsubscribe()
    this.userSub.unsubscribe()
  }

  sortAppointments() {
    this.appointments.sort((a, b) => {
      let d1 = new Date(a.time)
      let d2 = new Date(b.time)
      return d1.getTime() - d2.getTime()
    })
  }

  matchNameDate(app: Appointment): boolean {
    return (
      app.dog.name.toLowerCase().includes(this.keyword.toLowerCase()) &&
      (this.keydate.toString() == this.keydateDefaultStr || 
      app.time.toString().includes(this.keydate.toString()))
    )
  }
}
