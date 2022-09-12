import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  getPost(postId: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {

   }

   getAllPost() : Observable<Array<PostService>>{
    return this.http.get<Array<PostService>>('http://localhost:4200/api/posts')
   }

   /**
    * Calling HTTP Post to this REST post creation API returns an observable.
    */

   createPost(postPayLoad : CreatePostPayload) : Observable<any>{
    return this.http.post('http://localhost:4200/api/posts,', postPayLoad);
   }
}
