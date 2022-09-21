import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { LoginResponse } from './login.reponse';
import { LoginRequest } from './login.request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  loginRequest! : LoginRequest;
/**
 * Create object
 */
  constructor(private authService : AuthService, private router : Router, private formBuilder : FormBuilder) {
    this.loginRequest = {
      username: '',
      password: '',
    };
   }

  /**
   * Define a formControl for the two fields Username and Password
   *
   */

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group ({
      username : ['', Validators.required],
      password : ['', Validators.required],
    });
  }

  // this.activatedRouter.queryParams.subscribe(params => {
  //   if (params.registered !== undefined && params.registered == 'true')
  // })

  /**
   * Create a login measure and read username and password values
   */

  public login() : void {
    console.log(this.loginForm)
    this.loginRequest.username = this.loginForm.controls['username'].value;
    this.loginRequest.password = this.loginForm.controls['password'].value;
    this.authService.login(this.loginRequest).subscribe((data : boolean)  => {
      console.log(data);
      console.log('Login Successful');
      this.router.navigateByUrl('/home');
      });
  }
}

