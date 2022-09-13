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

  constructor(private httpClient : HttpClient, private localStore : LocalStorageService) { }

/**
 * Call to Sign-up API
 */

  signup(signupRequestPayload : SignupRequestPayload) : Observable<any>{
    return this.httpClient.post('http://localhost:4200/api/auth/signup', signupRequestPayload,)
  }

/**
 * Call to Login API
 * the local storage by typing this part local storage bot store followed
 */

  login(LoginRequest : LoginRequest) : Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:4200/api/auth/login',
    LoginRequest).pipe(map(data => {
      this.localStore.store('authenticationToken', data.authenticationToken);
      this.localStore.store('username', data.username);
      this.localStore.store('refreshToken', data.refreshToKen);
      this.localStore.store('expiresAt', data.expiresAt);

      return true;
    }))
  }

  RefreshToken(){
    const refreshToKenPayload = {
      RefreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }
    return this.httpClient.post<LoginResponse>('http://localhost:4200/api/auth/refesh/token', refreshToKenPayload)
    .pipe(tap(response => {
      this.localStore.store('authenticationToken', response.authenticationToken);
      this.localStore.store('expiresAt', response.expiresAt);
    }));
  }
  getJwtToken() {
    return this.localStore.retrieve('authenticationToken');
  }
  getRefreshToken() : string{
    return this.localStore.retrieve('refreshToken');
  }

  getUserName() : string{
    return this.localStore.retrieve('username');
  }

  isLoggedIn() : boolean{
    return this.getJwtToken() != null;
  }
}


