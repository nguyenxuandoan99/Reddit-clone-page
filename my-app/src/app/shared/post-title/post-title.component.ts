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
  @Input() posts! : PostModel[];
  searchText : string = "";
  public faComments = faComments;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  /**
   * Create Readpost button to display posts by id
   *
   */
  public readPost(id : number) : void{
    this.router.navigateByUrl('/view-post/' + id);
  }

  // public addTitle(){

  // }
  /**
   * Create button remove to delete Post by id
   */
  public remove (id : number){
    alert (" You want remove title" + id);
      const index = this.posts.findIndex(( title: { id: number; }) =>  title.id === id);
      if(index !== -1){
        this.posts.splice(index,1);
      }
  }


}
