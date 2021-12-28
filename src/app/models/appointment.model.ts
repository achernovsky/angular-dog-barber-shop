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
}