import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError, observable,Subscriber } from 'rxjs';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId! : number;
  post! : PostModel; //nhận kiểu dữ liệu từ component PostModel
  constructor(private postService : PostService, private activateRoute : ActivatedRoute, private router : Router) {
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

}
