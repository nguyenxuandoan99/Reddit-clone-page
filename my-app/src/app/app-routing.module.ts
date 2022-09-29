import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { PostService } from './shared/post.service';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditComponent } from './subreddit/list-subreddit/list-subreddit.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'home', component : HomeComponent},
  {path: 'post-title', component : PostService},
  { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard] },
  {path: 'list-subreddit' , component : ListSubredditComponent},
  {path: 'view-post/:id' , component : ViewPostComponent},
  {path: 'create-post' , component : CreatePostComponent, canActivate : [AuthGuard]},
  {path: 'create-subreddit' , component : CreateSubredditComponent, canActivate: [AuthGuard]},
  {path: 'login', component : LoginComponent},
  {path: 'signup', component : SignupComponent},
  {path: '' , redirectTo : 'login', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
