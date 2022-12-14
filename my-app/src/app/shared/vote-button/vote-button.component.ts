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

  /**
   * declare and initialize the VotePayload  object
   */
  ngOnInit(): void {
    this.votePayload = {
      voteType : null,
      postId : null
    }
    this.authService.loggedIn.subscribe((data : boolean) => this.isLoggedIn = data);
    this.updateVoteDetails();
  }

  /**
   * The upvotePost() method sets the VoteType for the VotePayload object
   * and calls the vote() method inside the component.
   * Mỗi 1 id account login chỉ upvote được 1 lần
   */
  upvotePost():void{
    console.log("up");
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    // this.downvoteColor = '';
  }

  /**
   * Mỗi 1 id account login chỉ downvote được 1 lần
   */
  downvotePost():void{
    console.log("down");
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    // this.upvoteColor = '';
  }

  /**
   * This vote() method, which is setting the value to the postId field as input
   * call the vote() method of the VoteService class, which returns an Observable.
   */
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
