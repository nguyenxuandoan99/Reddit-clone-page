import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name! : string;
  posts! : PostModel[];
  comments! : string;
  postLength! : number;
  commentLength! : number;
  constructor(private activatedRouter : ActivatedRoute, private postService : PostService) {
    this
   }

  ngOnInit(): void {
  }

}
