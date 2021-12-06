export class Appointment {
    public id: number
    public name: string
    public time: Date
    public createTime: Date

    private static currentId = 1

    constructor(name: string, time: Date) {
        this.id = Appointment.currentId
        this.name = name
        this.time = time
        this.createTime = new Date(Date.now())
        Appointment.currentId++
    }
}