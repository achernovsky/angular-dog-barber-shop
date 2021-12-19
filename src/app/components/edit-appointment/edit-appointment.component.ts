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
  appointments: Appointment[] = []
  appointment: Appointment = new Appointment
  editForm: FormGroup
  today: string

  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id']

    this.appointmentService.getAppointments()
    .subscribe((response: Appointment[]) => {
      this.appointments = response
    });


    this.appointmentService.getAppointmentById(id)
    .subscribe((response: Appointment) => {
      this.appointment = response
      let appDateTime = new Date(this.appointment.time)

      this.editForm = new FormGroup({
        'dogName': new FormControl(
          this.appointment.dog.name, 
          Validators.required
        ),
        'date': new FormControl(
          `${appDateTime.getFullYear()}-${appDateTime.getMonth() + 1}-${appDateTime.getDate()}`,
          [
            Validators.required,
            this.invalidDates.bind(this),
            this.invalidDaysOfTheWeek.bind(this)
          ]
        ),
        'time': new FormControl(
          appDateTime.toString().substring(16,21), 
          Validators.required
        )
      })
    });

    this.today = new Date().toISOString().substring(0,10)

    this.editForm = new FormGroup({
      'dogName': new FormControl(
        // this.appointment.dog.name, 
        // Validators.required
      ),
      'date': new FormControl(
        // `${this.appointment.time}`,
        // [
        //   Validators.required,
        //   this.invalidDates.bind(this),
        //   this.invalidDaysOfTheWeek.bind(this)
        // ]
      ),
      'time': new FormControl(
        // this.appointment.time, 
        // Validators.required
      )
    })
  }

  onSaveChanges() { 
    // const appTime = this.editForm.value.date + " " + this.editForm.value.time
    // this.appointment.dog.name = this.editForm.value.dogName
    // this.appointment.time = new Date(appTime)
    let body = 
    [
      {
        "value": this.editForm.value.date + " " + this.editForm.value.time,
        "path": "/Time",
        "op": "replace"
      },
      {
        "value": {
          Id: this.appointment.dogId,
          ApplicationUserId: this.appointment.applicationUserId,
          Name: this.editForm.value.dogName
        },
        "path": "/Dog",
        "op": "replace"
      }
    ]
    // {
    //   "value": this.editForm.value.dogName,
    //   "path": "/Dog/Name",
    //   "op": "replace"
    // }
    
    //console.log(body)
    this.appointmentService.editAppointment(this.appointment.id, body)
    .subscribe(response => {
      console.log("Successfully updated", response)
      this.appointmentService.getAppointments()
        .subscribe((response: Appointment[]) => {
          this.appointmentService.appointmentsChanged.next(response)
          this.router.navigate(['/appointments'])
        });
    })
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

    this.appointments.forEach(a => {
      let appDateTime = new Date(this.appointment.time)
      let otherDateTime = new Date(a.time)

      if (otherDateTime.toString() === timeToCheck.toString() && appDateTime.toString() !== timeToCheck.toString()) {
        isAvailable = false
      }
    })
    return isAvailable
  }
}
