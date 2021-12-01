import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments-main',
  templateUrl: './appointments-main.component.html',
  styleUrls: ['./appointments-main.component.css']
})
export class AppointmentsMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loadedFeature: string = 'list'

  onFeatureSelect(feature: string) {
    this.loadedFeature = feature
  }
}
