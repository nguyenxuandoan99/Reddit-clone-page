import { Component, OnInit } from '@angular/core';
// import { SubredditService } from 'src/app/subreddit.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { SubredditService } from 'src/app/subreddit/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: Array<SubredditModel> = [];
  // displayViewAll!: boolean;
  constructor(private subredditService: SubredditService) {

   }
  /**
   * Display all subreddits
   */
  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe((data : any ) => {
      console.log(data)
      this.subreddits = data;
    });
  }

}
