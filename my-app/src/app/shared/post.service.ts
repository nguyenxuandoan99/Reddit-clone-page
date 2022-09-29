import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postId: any;

  constructor(private http: HttpClient) {

  }

  //Get/:id: http
  getPost(id : number) : Observable<PostModel> {
    return this.http.get<PostModel>("http://localhost:8080/api/posts/" + id);
  }

  /**
   * Danh sach
   * Get: http://localhost:4200/home
   * returns an Observable of Config
   */
   getAllPost() : Observable<Array<PostModel[]>>{
    return this.http.get<Array<PostModel[]>>("http://localhost:8080/api/posts/");
   }

   /**
    * Calling HTTP Post to this REST post creation API returns an observable.
    */

   createPost(postPayLoad : CreatePostPayload) : Observable<any>{
    return this.http.post("http://localhost:8080/api/posts/", postPayLoad);
   }

   getAllPostsByUser(name : string) : Observable<PostModel[]>{
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-user/' + name);
   }
}
