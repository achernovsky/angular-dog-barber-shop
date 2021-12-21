import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dog } from 'src/app/models/dog.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  isLoading: boolean = false
  error: string = null
  private registerSub: Subscription
  dogs: Object[] = []

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onAddDog(form: NgForm) {
    this.dogs.push({"Name" : form.value.dog})
  }

  onSubmit(form: NgForm) {
    this.isLoading = true
    console.log('submitting')

    this.registerSub = this.authService.register({
      "UserName": form.value.username,
      "Password": form.value.password,
      "Dogs": this.dogs
    })
    .subscribe({
      next: res => {
        console.log(res)
        this.isLoading = false
        this.router.navigate(['/login'])
      },
      error: e => {
        console.log(e)
        this.error = 'Invalid data'
        this.isLoading = false
      }
    })

    form.reset()
  }

  ngOnDestroy(): void {
    if (this.registerSub){
      this.registerSub.unsubscribe()
    }
  }

}
