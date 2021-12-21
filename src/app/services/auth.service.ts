import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, tap } from "rxjs";
import { User } from "../models/user.model";

interface LoginResponseData {
    "token": string,
    "userid": string,
    "username": string
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null)

    constructor(private http: HttpClient) { }

    register() {

    }

    login(data) {
        return this.http.post<LoginResponseData>("http://localhost:7261/authentication/login", data)
        .pipe(tap(response => {
            const user = new User(response.userid, response.username, response.token)
            this.user.next(user)
        }))
    }
}