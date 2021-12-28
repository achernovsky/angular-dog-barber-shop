import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class DogService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    getUserDogs() {
        return this.http.get("http://localhost:7261/dogs")
    }
}