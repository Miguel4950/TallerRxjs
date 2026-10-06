import { Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormSubmittedEvent } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { switchMap, tap, filter, catchError } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    UserProfileComponent,
    UserPostsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  private userService = inject(UserService);
  private postService = inject(PostService);

  user: User | null = null;
  posts: Post[] = [];

  loading: boolean = false;
  userNotFound: boolean = false;
  searchedUsername: string = '';
  errorMessage: string = '';

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required])
  });

  private subscription?: Subscription;

  readonly sampleUsers: string[] = ['emilys', 'michaelw', 'sophiab', 'atuny0', 'usuario_inexistente'];

  constructor() {
    this.subscription = this.userForm.events.pipe(
      filter((e) => e instanceof FormSubmittedEvent),
      filter(() => this.userForm.valid),
      tap(() => {
        this.loading = true;
        this.userNotFound = false;
        this.errorMessage = '';
        this.user = null;
        this.posts = [];
      }),
      switchMap(() => {
        const username = this.userForm.value.username?.trim() || '';
        this.searchedUsername = username;
        return this.userService.searchUser(username).pipe(
          catchError(() => {
            this.errorMessage = 'No se pudo conectar con la API de DummyJSON.';
            return of({ users: [], total: 0, skip: 0, limit: 0 });
          })
        );
      }),
      switchMap((response) => {
        if (!response.users || response.users.length === 0) {
          this.user = null;
          this.userNotFound = true;
          this.loading = false;
          return of([]);
        }

        this.user = response.users[0];
        this.userNotFound = false;

        return this.postService.getPostsWithCommentsByUserId(this.user.id).pipe(
          catchError(() => of([]))
        );
      })
    ).subscribe({
      next: (posts) => {
        if (this.user) {
          this.posts = posts;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Ocurrió un error al cargar la información.';
      }
    });
  }

  selectSampleUser(username: string): void {
    this.userForm.patchValue({ username });
    const formElement = document.querySelector('form');
    formElement?.requestSubmit();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
