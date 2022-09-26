import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError, observable,Subscriber } from 'rxjs';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId! : number;
  //nhận kiểu dữ liệu từ component PostModel
  post! : PostModel;
  commentForm !: FormGroup;
  commentPayload! : CommentPayload;
  comments !: CommentPayload[];
  constructor(private postService : PostService, private activateRoute : ActivatedRoute, private router : Router,private commentService : CommentService ) {
    this.postId = this.activateRoute.snapshot.params['id'];
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    /**
     * Declare the instantiation of the commentPayload object
     * Use this object when making POST calls to the Comment API.
     */
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
   }
  /**
   * Display a Post by id
   */
  ngOnInit(): void {
    this.postId = this.activateRoute.snapshot.params['id'];
    this.postService.getPost(this.postId).subscribe(data =>{
      console.log(data)
      this.post = data;
    });
  }

  /**
   * Declare the postComment() method
   * postComment() method reads the value for the FormControl variable from the FormGroup - commentForm.
   * Then assign a value to the CommentPayload object's text field.
   */
  postComment() {
    this.commentPayload.text = this.commentForm.controls['text'].value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      alert('comment successful')
      this.commentForm.controls['text'].setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  /**
   * getCommentsForPost() method inside constructor, used to call getAllCommentsForPost() from CommentService.
   */
  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }
}
