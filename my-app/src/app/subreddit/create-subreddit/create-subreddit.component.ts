import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { SubredditModel } from '../subreddit-response';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  //Formgroup of the form initializer Subreddit
  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;
  title = new FormControl('');
  description = new FormControl('');
  subredditService: any;

  /**
   * The environment assigned to a form control object contains a validator
   * that the values for the field title and description are not empty.
   */
  constructor(private router: Router, private formBuilder : FormBuilder) {
    this.createSubredditForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    /**
     * Khởi tạo đối tượng mô hình subreddit
     */
    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit() {
  }

  /**
  * The discard method returns to the homepage
  */

  discard() {
    this.router.navigateByUrl('/');
  }

  /**
   * The createSubreddit method reads the form control values for 'title' and 'description'.
   */

  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.controls['title'].value;
    this.subredditModel.description = this.createSubredditForm.controls['description'].value;
    this.router.navigateByUrl('/list-subreddit');
    this.subredditService.createSubreddit(this.subredditModel).subscribe((data: any) => {
    }, (error: any) => {
      throwError(error);
    })
  }
}
