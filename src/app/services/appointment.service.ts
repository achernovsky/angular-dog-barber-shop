import { Appointment } from "../models/appointment.model";

export class AppointmentService {
    private appointments: Appointment[] = [
        new Appointment("Lucky", new Date("2021-12-13T17:00:00")),
        new Appointment("Oscar", new Date("2021-12-13T17:30:00")),
    ]

    getAppointments() {
        return this.appointments
    }

    addAppointment(app: Appointment) {
        this.appointments.push(app)
    }

}