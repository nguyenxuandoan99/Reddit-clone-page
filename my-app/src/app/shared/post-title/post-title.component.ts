import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css']
})
export class PostTitleComponent implements OnInit {

  // posts: PostModel[] = [
  //   {
  //   id : 1,
  //   postName : 'title 1',
  //   url: '#',
  //   description: 'abcd',
  //   voteCount : 1,
  //   userName : 'title 1',
  //   subredditName : 'abc',
  //   commentCount : 4,
  //   duration : 'abc',
  // }
  // ];
  @Input() posts! : PostModel[];
  faComments = faComments;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  public goToPost(id : number) : void{
    this.router.navigateByUrl('/view-post/' + id);
  }

}
