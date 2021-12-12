import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  dogName: string
  time: Time
  date: Date
  today: string
  weekday: number
  apps = this.appointmentService.getAppointments();

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().substring(0,10)
  }

  checkDayOfTheWeek() {
    const dateToCheck = new Date(this.date)
    this.weekday = dateToCheck.getDay()
  }

  onAdd(form: NgForm) {
    let appTime = new Date(this.time + " " + this.date)
    const newAppointment = new Appointment(this.dogName, appTime)
    this.appointmentService.addAppointment(newAppointment)
    this.router.navigate(['/appointments'])
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
