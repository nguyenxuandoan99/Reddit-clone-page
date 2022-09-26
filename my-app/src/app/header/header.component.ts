import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() searchtextChange : EventEmitter<string> = new EventEmitter<string>();
  faUser = faUser;
  isLoggedIn! : boolean;
  username! : string;
  searchValue : string = '' ;
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  /**
   * Navigate to the user-profile page
   */
  goToUserProfile(){
    this.router.navigateByUrl('/user-profile/' + this.username);
  }
  /**
   * Logout account
   * Navigate to the login page
   */
  logout(){
    this.authService.logout()
    this.router.navigateByUrl('').then(() =>{
      window.location.reload();
    })
  }

  /**
   * Search post by postName
   */
  searchPosts(){
    this.searchtextChange.emit(this.searchValue);
  }
}
