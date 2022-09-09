import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { LoginRequest } from './login.request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  LoginRequest! : LoginRequest;

/**
 * Create object
 */
  constructor(private authService : AuthService, private activatedRouter : ActivatedRoute, private router : Router) {
    this.LoginRequest = {
      username: '',
      password: '',
    };
   }

  /**
   * Define a formControl for the two fields Username and Password
   *
   */

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
  }

  // this.activatedRouter.queryParams.subscribe(params => {
  //   if (params.registered !== undefined && params.registered == 'true')
  // })
  /**
   * Create a login measure and read username and password values
   */

  login(){
    this.LoginRequest.username = this.loginForm.get('username')?.value;
    this.LoginRequest.password = this.loginForm.get('password')?.value;
    this.authService.login(this.LoginRequest).subscribe(data => {
      console.log('Login Successful');
    });
  }
}
