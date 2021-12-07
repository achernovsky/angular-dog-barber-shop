import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef
  @ViewChild('timeInput', { static: false }) timeInputRef: ElementRef

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
  }

  onAdd() {
    const appName = this.nameInputRef.nativeElement.value
    const appTime = new Date(this.timeInputRef.nativeElement.value)
    const newAppointment = new Appointment(appName, appTime)
    this.appointmentService.addAppointment(newAppointment)
    this.router.navigate(['/appointments'])
  }
}
