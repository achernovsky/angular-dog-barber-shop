import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef
  @ViewChild('timeInput', { static: false }) timeInputRef: ElementRef
  
  id: number
  appointment: Appointment

  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id']
    this.appointment = this.appointmentService.getAppointmentById(this.id)
  }

  onSaveChanges() {
    const appName = this.nameInputRef.nativeElement.value
    const appTime = this.timeInputRef.nativeElement.value
    this.appointment.name = appName
    this.appointment.time = new Date(appTime)
    this.router.navigate(['/appointments'])
  }
}
