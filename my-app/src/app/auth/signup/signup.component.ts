import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private authService : AuthService, private router : Router, private toastr: ToastrService,private formBuilder : FormBuilder ) {
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
          this.signupForm = this.formBuilder.group({
            email :   ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
          })
  }

  public signup(){
      this.signupRequestPayload.username = this.signupForm.controls['username'].value;
      this.signupRequestPayload.email = this.signupForm.controls['email'].value;
      this.signupRequestPayload.password = this.signupForm.controls['password'].value;
      this.router.navigate(['/login']);
      // this.authService.signup(this.signupRequestPayload)
      //   .subscribe(data => {
      //     this.router.navigate(['/login'],
      //     { queryParams : { registered : 'true'} });
      //     console.log(data);
      //   }, () => {
      //     this.toastr.error("Registration Failed! please try again");
      //   });
  }

  public get f(){
    return this.signupForm.controls
  }
}
