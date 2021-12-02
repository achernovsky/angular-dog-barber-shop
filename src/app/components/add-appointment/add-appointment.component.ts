import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef
  @ViewChild('timeInput', { static: false }) timeInputRef: ElementRef
  @Output() appointmentAdded = new EventEmitter<Appointment>()

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    const appName = this.nameInputRef.nativeElement.value
    const appTime = this.timeInputRef.nativeElement.value
    const newAppointment = new Appointment(appName, appTime)
    this.appointmentAdded.emit(newAppointment)
  }
}
