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

  getPost(id : number) : Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost.4200/api/posts/' + id);
  }

  constructor(private http: HttpClient) {

   }

   getAllPost() : Observable<Array<PostService>>{
    return this.http.get<Array<PostService>>('') //http://localhost:4200/api/posts
   }

   /**
    * Calling HTTP Post to this REST post creation API returns an observable.
    */

   createPost(postPayLoad : CreatePostPayload) : Observable<any>{
    return this.http.post('', postPayLoad);
   }

   getAllPostsByUser(name : string) : Observable<PostModel[]>{
    return this.http.get<PostModel[]>("",)
   }
}
