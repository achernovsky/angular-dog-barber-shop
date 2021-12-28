import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { Dog } from 'src/app/models/dog.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-display-appointment',
  templateUrl: './display-appointment.component.html',
  styleUrls: ['./display-appointment.component.css']
})

export class DisplayAppointmentComponent implements OnInit {
  id: number
  appointment: Appointment = new Appointment
  timeToDisplay: string
  createdAtToDisplay: string
  dogs: Dog[] = []
  found: boolean = true
  private getUserDogsSub: Subscription
  private appsSub: Subscription

  constructor(
    private route: ActivatedRoute, 
    private appointmentService: AppointmentService, 
    private dogService: DogService, 
    private router: Router) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id']
    this.appsSub = this.appointmentService.getAppointmentById(this.id)
    .subscribe((response: Appointment) => {
      this.appointment = response
      let date = new Date(this.appointment.time)
      this.timeToDisplay = date.toString().substring(0, 21)
      let createDate = new Date(this.appointment.createdAt)
      this.createdAtToDisplay = createDate.toString().substring(0, 21)
    });

    this.getUserDogsSub = this.dogService.getUserDogs()
    .subscribe((res: Dog[]) => {
      this.dogs = res
    })
  }

  ngOnDestroy(): void {
    this.getUserDogsSub.unsubscribe()
    this.appsSub.unsubscribe()
  }

  onClickEdit() {
    let temp = false
    this.dogs.forEach(d => {
      if (d.id === this.appointment.dogId) {
        temp = true
        this.router.navigate(['appointments', this.appointment.id, 'edit'])
      }
    })
    this.found = temp
  }
}
