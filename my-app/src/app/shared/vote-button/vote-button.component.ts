import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { VoteService } from '../vote.service';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post!: PostModel;
  public votePayload !: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor !: string;
  downvoteColor !: string;
  isLoggedIn !: boolean;

  constructor(private voteService : VoteService, private authService : AuthService, private postService : PostService) {
    // this.votePayload = {
    //   voteType : undefined,
    //   postId : null
    // }
    // this.authService.loggedIn.subscribe((data : boolean) => this.isLoggedIn = data);
   }

  ngOnInit(): void {
    this.updateVoteDetails();
    this.votePayload = {
      voteType : null,
      postId : null
    }
    this.authService.loggedIn.subscribe((data : boolean) => this.isLoggedIn = data);
  }

  upvotePost():void{
    console.log("up");
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }
  downvotePost():void{
    console.log("kkk");
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      // this.toastr.error(error.error.message);
      throwError(error);
    });
  }
  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }
}
