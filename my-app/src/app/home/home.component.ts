import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText : string = "";
  posts : Array<PostModel> = [];

  constructor(private postService : PostService){
  }

  /**
   * Display all Post
   */
  ngOnInit(): void {
    this.postService.getAllPost().subscribe((post : any) =>{
      this.posts = post;
    });
  }

  /**
   * Initialize searchPosts() method to search for posts
   * User to search Post by postName
   */
  searchPosts(searchvaluepost : string){
    this.searchText = searchvaluepost;
    this.posts = this.posts.filter(post => post.postName.includes(this.searchText));
    console.log(this.searchText);
  }
}
