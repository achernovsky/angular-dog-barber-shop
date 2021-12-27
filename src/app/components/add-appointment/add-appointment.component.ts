import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { Dog } from 'src/app/models/dog.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit, OnDestroy {
  dogName: string
  time: Time
  date: Date
  today: string
  weekday: number
  apps: Appointment[] = []
  dogs: Dog[] = []
  private appsChangeSub: Subscription
  private getUserDogsSub: Subscription
  private getAppsSub: Subscription

  constructor(
    private appointmentService: AppointmentService, 
    private dogService: DogService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().substring(0,10)
    this.getAppsSub = this.appointmentService.getAppointments()
    .subscribe((res: Appointment[]) => {
      this.apps = res
    })
    this.appsChangeSub = this.appointmentService.appointmentsChanged
      .subscribe(
        (appointments: Appointment[]) => {
          this.apps = appointments
        }
      )
    this.getUserDogsSub = this.dogService.getUserDogs()
    .subscribe((res: Dog[]) => {
      this.dogs = res
    })
  }

  ngOnDestroy(): void {
     this.appsChangeSub.unsubscribe()
     this.getUserDogsSub.unsubscribe()
     this.getAppsSub.unsubscribe()
  }

  checkDayOfTheWeek() {
    const dateToCheck = new Date(this.date)
    this.weekday = dateToCheck.getDay()
  }

  onAdd(form: NgForm) {
    const appTime = new Date(this.date + " " + this.time)
    const newAppointment = {
      time: appTime,
      dog: {
        name: this.dogName
      }
    }
    console.log(newAppointment)
    this.appointmentService.addAppointment(newAppointment)
    .subscribe(res => {
      console.log("added successfully")
      this.router.navigate(['/appointments'])
    })
  }

  checkAvailable(selectedTime: string) {
    const timeToCheck = new Date(this.date + " " + selectedTime)
    let isAvailable = true
    if (timeToCheck < new Date()) {
      isAvailable = false
    }
    this.apps.forEach(a => {
      let otherTime = new Date(a.time)
      if (otherTime.toString() === timeToCheck.toString()) {
        isAvailable = false
      }
    })
    return isAvailable
  }
}
