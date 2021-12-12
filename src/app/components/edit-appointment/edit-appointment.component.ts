import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id']
    this.appointment = this.appointmentService.getAppointmentById(id)
    this.editForm = new FormGroup({
      'dogName': new FormControl(this.appointment.name),
      'date': new FormControl(`${this.appointment.time.getFullYear()}-${this.appointment.time.getMonth() + 1}-${this.appointment.time.getDate()}`),
      'time': new FormControl(this.appointment.time.toString().substring(16,21))
    })
  }

  onSaveChanges() {
    console.log(this.editForm)
    const appTime = this.editForm.value.date + " " + this.editForm.value.time
    this.appointment.name = this.editForm.value.dogName
    this.appointment.time = new Date(appTime)
    this.router.navigate(['/appointments'])
  }
}
