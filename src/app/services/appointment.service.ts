import { Appointment } from "../models/appointment.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { analyzeAndValidateNgModules } from "@angular/compiler";



@Injectable({providedIn: 'root'})
export class AppointmentService {

    constructor(private http: HttpClient) {}

    appointmentsChanged = new Subject<Appointment[]>()

    private appointments: Appointment[]

    getAppointments() {
        return this.http.get("http://localhost:7261/appointments")
        // .pipe(
        //     map(responseData => {
        //         const appointmentsArray: Appointment[] = []
        //         for (const key in responseData) {
        //             appointmentsArray.push(new Appointment(
        //                 responseData[key].id,
        //                 responseData[key].dogId,
        //                 responseData[key].dog, 
        //                 responseData[key].applicationUserId, 
        //                 responseData[key].time,
        //                 responseData[key].createdAt
        //                 ))
        //         }
        //         console.log(appointmentsArray)
        //         return appointmentsArray
        // }))

        //return this.appointments
    }

    getAppointmentById(id: number) {
        return this.http.get(`http://localhost:7261/appointments/${id}`)
        // .pipe(
        //     map((responseData: Appointment) => {
        //         const appointment = 
        //             new Appointment(
        //                 responseData.id,
        //                 responseData.dogId,
        //                 responseData.dog,
        //                 responseData.applicationUserId, 
        //                 responseData.time,
        //                 responseData.createdAt
        //             )
        //             console.log(appointment)
        //             return appointment
        //     }) 
        // )   
        //return this.appointments.filter(app => app.id === id)[0]
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