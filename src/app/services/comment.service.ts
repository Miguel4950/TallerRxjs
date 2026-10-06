import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentResponse } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://dummyjson.com/comments';

  getCommentsByPostId(postId: number): Observable<CommentResponse> {
    return this.http.get<CommentResponse>(`${this.baseUrl}/post/${postId}`);
  }
}
