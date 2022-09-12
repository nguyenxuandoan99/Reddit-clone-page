import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditComponent } from './subreddit/list-subreddit/list-subreddit.component';

const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'list-subreddit' , component : ListSubredditComponent},
  {path: 'view-post/:id' , component : ViewPostComponent},
  {path: 'create-post' , component : CreatePostComponent},
  {path: 'create-subreddit' , component : CreateSubredditComponent},
  {path: 'login', component : LoginComponent},
  {path: 'signup', component : SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
