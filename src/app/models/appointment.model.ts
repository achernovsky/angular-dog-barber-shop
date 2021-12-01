export class Appointment {
    public name: string
    public time: Date
    public createTime: Date

    constructor(name: string, time: Date) {
        this.name = name
        this.time = time
        this.createTime = new Date(Date.now())
    }
}