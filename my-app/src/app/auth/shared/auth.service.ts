import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable, tap } from 'rxjs';
import { LoginResponse } from '../login/login.reponse';
import { LoginRequest } from '../login/login.request.payload';
import { SignupRequestPayload } from '../signup/signup.request.pauload';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: any;
  username: any;

  constructor(private httpClient : HttpClient, private localStogare : LocalStorageService) { }

/**
 * Call to Sign-up API
 */

  signup(signupRequestPayload : SignupRequestPayload) : Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' }) //
  }

/**
 * Call to LSogin API
 * the local storage by typing this part local storage bot store followed
 */

  login(LoginRequest : LoginRequest) : Observable<boolean> {
    return this.httpClient.post<LoginResponse>("http://localhost:8080/api/auth/login",
    LoginRequest).pipe(map(data => {
      this.localStogare.store('authenticationToken', data.authenticationToken);
      this.localStogare.store('username', data.username);
      this.localStogare.store('refreshToken', data.refreshToKen);
      this.localStogare.store('expiresAt', data.expiresAt);
      // this.loggedIn.emit(true);
      // this.username.emit(data.username);
      return true;
    }));
  }

  refreshToken(){
    const refreshToKenPayload = {
      RefreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refesh/token', refreshToKenPayload)
    .pipe(tap(response => {
      this.localStogare.store('authenticationToken', response.authenticationToken);
      this.localStogare.store('expiresAt', response.expiresAt);
    }));
  }
  getJwtToken() {
    return this.localStogare.retrieve('authenticationToken');
  }
  getRefreshToken() : string{
    return this.localStogare.retrieve('refreshToken');
  }

  getUserName() : string{
    return this.localStogare.retrieve('username');
  }

  isLoggedIn() : boolean{
    return this.getJwtToken() != null;
  }
}


