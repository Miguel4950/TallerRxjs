import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://dummyjson.com/users';

  searchUser(username: string): Observable<UserResponse> {
    const encodedUsername = encodeURIComponent(username.trim());
    return this.http.get<UserResponse>(`${this.baseUrl}/filter?key=username&value=${encodedUsername}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
