import { Component, Input, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { CommentPayload } from '../comment/comment.payload';
import { CommentService } from '../comment/comment.service';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.css']
})
export class ViewCommentComponent implements OnInit {
  postId! : number;
  @Input() comments !: CommentPayload[];
  constructor(private commentService : CommentService) { }

  ngOnInit(): void {
    // this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
    //   this.comments = data;
    // }, error => {
    //   throwError(error);
    // });
  }

}
