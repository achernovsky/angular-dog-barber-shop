import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { Dog } from 'src/app/models/dog.model';
import { AppointmentService } from 'src/app/services/appointment.service';

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
  private appsChangeSub: Subscription

  constructor(
    private appointmentService: AppointmentService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().substring(0,10)
    this.appointmentService.getAppointments()
    .subscribe((res: Appointment[]) => {
      this.apps = res
    })
    this.appsChangeSub = this.appointmentService.appointmentsChanged
      .subscribe(
        (appointments: Appointment[]) => {
          this.apps = appointments
        }
      )
  }

  ngOnDestroy(): void {
     this.appsChangeSub.unsubscribe()
  }

  checkDayOfTheWeek() {
    const dateToCheck = new Date(this.date)
    this.weekday = dateToCheck.getDay()
  }

  onAdd(form: NgForm) {
    // let appTime = new Date(this.time + " " + this.date)
    // const newAppointment = new Appointment(this.dogName, appTime)
    // this.appointmentService.addAppointment(newAppointment)
    // this.router.navigate(['/appointments'])
    const appTime = new Date(this.date + " " + this.time)
    console.log(appTime)
    const newAppointment = {
      time: appTime,
      dogId: 1
    }
    console.log(newAppointment)
    this.appointmentService.addAppointment(newAppointment)
    .subscribe(res => {
      console.log("added successfully")
      this.router.navigate(['/appointments'])
    })
    
  }

  checkAvailable(selectedTime: string) {
    const timeToCheck = new Date(selectedTime + " " + this.date)
    let isAvailable = true
    if (timeToCheck < new Date()) {
      isAvailable = false
    }
    this.apps.forEach(a => {
      if (a.time.toString() === timeToCheck.toString()) {
        isAvailable = false
      }
    })
    return isAvailable
  }
}
