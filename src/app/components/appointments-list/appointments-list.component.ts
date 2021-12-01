import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {
  appointments: Appointment[] = [
    new Appointment("Lucky", new Date("2021-12-13T18:30:00")),
    new Appointment("Oscar", new Date("2021-12-14T17:30:00")),
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
