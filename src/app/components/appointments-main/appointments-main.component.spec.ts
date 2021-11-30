import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsMainComponent } from './appointments-main.component';

describe('AppointmentsMainComponent', () => {
  let component: AppointmentsMainComponent;
  let fixture: ComponentFixture<AppointmentsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
