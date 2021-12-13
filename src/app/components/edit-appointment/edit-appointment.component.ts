import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
  appointment: Appointment
  editForm: FormGroup
  today: string

  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id']
    this.appointment = this.appointmentService.getAppointmentById(id)
    this.today = new Date().toISOString().substring(0,10)

    this.editForm = new FormGroup({
      'dogName': new FormControl(
        this.appointment.name, 
        Validators.required
      ),
      'date': new FormControl(
        `${this.appointment.time.getFullYear()}-${this.appointment.time.getMonth() + 1}-${this.appointment.time.getDate()}`,
        [
          Validators.required,
          this.invalidDates.bind(this),
          this.invalidDaysOfTheWeek.bind(this)
        ]
      ),
      'time': new FormControl(
        this.appointment.time.toString().substring(16,21), 
        Validators.required
      )
    })
  }

  onSaveChanges() { 
    const appTime = this.editForm.value.date + " " + this.editForm.value.time
    this.appointment.name = this.editForm.value.dogName
    this.appointment.time = new Date(appTime)
    this.router.navigate(['/appointments'])
  }

  invalidDates(control: FormControl): {[s: string]: boolean} {
    if (control.value.toString() < this.today || control.value.toString() > '2022-12-31') {
      return {'invalidDate': true}
    }
    return null
  }

  invalidDaysOfTheWeek(control: FormControl): {[s: string]: boolean} {
    const dateToCheck = new Date(control.value)
    const weekday = dateToCheck.getDay()
    if (weekday === 0 || weekday === 6) {
      return {'invalidDayOfTheWeek': true}
    }
    return null
  }

  checkAvailableTimeSlot(selectedTime: string) {
    const timeToCheck = new Date(this.editForm.value.date + " " + selectedTime)
    let isAvailable = true
    if (timeToCheck < new Date()) {
      isAvailable = false
    }
    const apps = this.appointmentService.getAppointments()
    apps.forEach(a => {
      if (a.time.toString() === timeToCheck.toString() && this.appointment.time.toString() !== timeToCheck.toString()) {
        isAvailable = false
      }
    })
    return isAvailable
  }
}
