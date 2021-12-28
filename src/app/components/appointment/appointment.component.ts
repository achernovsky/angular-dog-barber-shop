import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { Dog } from 'src/app/models/dog.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit, OnDestroy {
  @Input() appointment: Appointment
  timeToDisplay: string
  dogs: Dog[] = []
  found: boolean = true
  private appsChangeSub: Subscription
  private getUserDogsSub: Subscription

  constructor(private appointmentService: AppointmentService, private dogService: DogService, private router: Router) { }

  ngOnInit(): void {
    let date = new Date(this.appointment.time)
    this.timeToDisplay = date.toString().substring(0, 21)
    this.getUserDogsSub = this.dogService.getUserDogs()
    .subscribe((res: Dog[]) => {
      this.dogs = res
    })
  }

  ngOnDestroy(): void {
    this.getUserDogsSub.unsubscribe()
  }

  onClickEdit() {
    let temp = false
    this.dogs.forEach(d => {
      if (d.id === this.appointment.dogId) {
        temp = true
        this.router.navigate(['appointments', this.appointment.id, 'edit'])
      }
    })
    this.found = temp
  }

  deleteAppointment() {
    let temp = false
    this.dogs.forEach(d => {
      if (d.id === this.appointment.dogId) {
        temp = true
      }
    })
    this.found = temp
    if (this.found) {
      this.appsChangeSub = this.appointmentService.deleteAppointment(this.appointment.id)
      .subscribe(res => {
        console.log("deleted successfullly")
        this.appointmentService.getAppointments()
        .subscribe((response: Appointment[]) => {
          this.appointmentService.appointmentsChanged.next(response)
        });
      })
    }
  }
}
