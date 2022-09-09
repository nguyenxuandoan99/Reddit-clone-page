import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup.request.pauload';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload!: SignupRequestPayload;
  signupForm!: FormGroup;
  // private toastr: ToastrService
  constructor(private authService : AuthService, private router : Router ) {
    this.signupRequestPayload = {
      username : '',
      password : '',
      email : '',
    };
   }

  /*
  initializing signupForm variable by assigning it to a new FormGroup
  There are three objects username, email and password
  */

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username : new FormGroup('' , Validators.required),
      email : new FormGroup('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  signup(){
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
      //   this.router.navigate(['/login'],
      //   { queryParams : { registered : 'true'} });
        console.log(data);
      // }, () => {
        // this.toastr.error("Registration Failed! please try again");
      });
  }

}
