import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Post, PostResponse } from '../models/post.model';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private commentService = inject(CommentService);
  private readonly baseUrl = 'https://dummyjson.com/posts';

  getPostsByUserId(userId: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.baseUrl}/user/${userId}`);
  }

  getPostsWithCommentsByUserId(userId: number): Observable<Post[]> {
    return this.getPostsByUserId(userId).pipe(
      switchMap((response: PostResponse) => {
        const posts = response.posts;
        if (!posts || posts.length === 0) {
          return of([]);
        }

        const postRequests = posts.map(post =>
          this.commentService.getCommentsByPostId(post.id).pipe(
            map(commentRes => ({
              ...post,
              comments: commentRes.comments
            })),
            catchError(() => of({ ...post, comments: [] }))
          )
        );

        return forkJoin(postRequests);
      })
    );
  }
}
