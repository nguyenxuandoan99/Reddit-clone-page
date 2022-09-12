import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts$ : Array<PostService> = [];

  constructor(private postService : PostService){
    this.postService.getAllPost().subscribe(post =>{
      this.posts$ = post;
    });
  }

  ngOnInit(): void {
  }

}
