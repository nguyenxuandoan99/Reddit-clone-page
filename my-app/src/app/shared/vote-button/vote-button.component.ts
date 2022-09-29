import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { VoteService } from '../vote.service';
import { VotePayload } from './vote-payload';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post!: PostModel;
  votePayload !: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor !: string;
  downvoteColor !: string;
  isLoggedIn !: boolean;
  constructor(private voteService : VoteService, private authService : AuthService, private postService : PostService) {
    // this.votePayload = {
    //   voteType: undefined,
    //   postId: undefined
    // }
    // this.authService.loggedIn.subscribe((data : boolean) => this.isLoggedIn = data);
   }

  ngOnInit(): void {
    // this.updateVoteDetails();
  }

  upvotePost():void{

  }
  downvotePost():void{}
}
