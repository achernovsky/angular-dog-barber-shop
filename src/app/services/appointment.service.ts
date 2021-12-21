import { Appointment } from "../models/appointment.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, take, exhaustMap } from "rxjs/operators";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AppointmentService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    appointmentsChanged = new Subject<Appointment[]>()

    getAppointments() {
        return this.http.get("http://localhost:7261/appointments")
    }

    getAppointmentById(id: number) {
        return this.http.get(`http://localhost:7261/appointments/${id}`)
    }

    addAppointment(app: any) {
        return this.http.post("http://localhost:7261/appointments", app)
    }

    editAppointment(id: number, data: any) {
        return this.http.patch(`http://localhost:7261/appointments/${id}`, data)
    }

    deleteAppointment(id: number) {
        return this.http.delete(`http://localhost:7261/appointments/${id}`)
    }
}