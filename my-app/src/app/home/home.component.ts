import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() posts! : PostModel[];
  posts$ : Array<PostService> = [];

  constructor(private postService : PostService){
    this.postService.getAllPost().subscribe(post =>{
      this.posts$ = post;
    });
  }

  ngOnInit(): void {
  }

}
