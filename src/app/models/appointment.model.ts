export class Appointment {
    public name: string
    public time: Date
    public createTime: Date

    constructor(name: string, time: Date, createTime: Date) {
        this.name = name
        this.time = time
        this.createTime = createTime
    }
}