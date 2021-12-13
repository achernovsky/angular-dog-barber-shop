import { Appointment } from "../models/appointment.model";

export class AppointmentService {
    private appointments: Appointment[] = [
        new Appointment("Lucky", new Date("2021-12-27T17:00:00")),
        new Appointment("Oscar", new Date("2021-12-27T17:30:00")),
    ]

    getAppointments() {
        return this.appointments
    }

    getAppointmentById(id: number) {
        return this.appointments.filter(app => app.id === id)[0]
    }

    addAppointment(app: Appointment) {
        this.appointments.push(app)
    }

}