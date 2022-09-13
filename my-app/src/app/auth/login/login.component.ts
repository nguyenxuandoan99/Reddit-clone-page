import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  // username : any;
  // password : any;
/**
 * Create object
 */
  constructor(private authService : AuthService, private router : Router, private formBuilder : FormBuilder) {
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
    console.log(this.loginForm.controls['username'].value);
    this.LoginRequest.username = this.loginForm.controls['username'].value;
    this.LoginRequest.password = this.loginForm.controls['password'].value;
    this.router.navigate(['home'])
    alert("Login Successfull");
    // this.authService.login(this.LoginRequest).subscribe(() => {
    //   console.log('Login Successful');

    // });
    }
    // LoginUser(): void{
    //   if(this.username == "admin" && this.password == "admin"){
    //     console.log("wellcome");
    //     this.router.navigate(['']);
    //   }
    //   else{
    //     console.log("login fail");
    //     alert("Login faile")
    //   }
    // }
}

