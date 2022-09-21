import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor( private router : Router) { }

  /**
   * Route to Create-post
   */
  goToCreatePost(){
    this.router.navigateByUrl('/create-post');
  }
  /**
   * Router to create-subreddit
   */
  goToCreateSubreddit(){
    this.router.navigateByUrl('/create-subreddit');
  }

  ngOnInit(): void {
  }

}
