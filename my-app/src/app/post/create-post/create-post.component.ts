import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { CreatePostPayload } from './create-post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm! : FormGroup;
  postPayLoad! : CreatePostPayload;
  subreddits! : Array<SubredditModel>;
  constructor(private router : Router, private postService : PostService, private subredditService : SubredditService, private formBuilder : FormBuilder  ) {
    this.postPayLoad = {
      postName: '',
      url: '',
      description: '',
      subredditName : '',
    }
   }

   /**
    * Define the field the form contains
    * provide more validators
    * Read all Subreddit because have to show them in dropdown and create post after reading them from subreddit service.
    */
  ngOnInit(): void {
    this.createPostForm = this.formBuilder.group({
      postName : ['', Validators.required],
      subredditName : ['', Validators.required],
      url :  ['', Validators.required],
      description : ['', Validators.required],
    });
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

  /**
   * Create a new Post
   */
  public createPost() : void{
    console.log(this.createPostForm);
    this.postPayLoad.postName = this.createPostForm.controls['postName'].value,
    this.postPayLoad.subredditName = this.createPostForm.controls['subredditName'].value,
    this.postPayLoad.url = this.createPostForm.controls['url'].value,
    this.postPayLoad.description = this.createPostForm.controls['description'].value,
    console.log(this.postPayLoad);
    debugger;
    this.postService.createPost(this.postPayLoad).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('home');
    });
  };

  /**
   * Redirect back to homepage
   */

  public discardPost() : void{
    this.router.navigateByUrl('home');
  }
}
