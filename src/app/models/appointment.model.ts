import { Dog } from "./dog.model"

export class Appointment {
    public id: number
    public dogId: number
    public dog: Dog
    public applicationUserId: string
    public time: Date
    public createdAt: Date


    constructor() {
        this.dog = new Dog()
    }

    // constructor(id: number, dogId: number, dog: Dog, applicationUserId: string, time: Date, createdAt: Date) {
    //     console.log('creating appoinrment')
    //     this.id = id
    //     this.dogId = dogId
    //     this.dog = dog
    //     this.applicationUserId = applicationUserId
    //     this.time = time
    //     this.createdAt = createdAt

    // }
}