import { computed, inject, Injectable, signal } from '@angular/core';
import { EMPTY, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { ApiService } from '../services/api.service';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class PostStoreService {
  private readonly apiService = inject(ApiService);

  // Private state signal
  private readonly state = signal<PostsState>({
    posts: [],
    loading: false,
    error: null,
  });

  // Selectors (public signals for reading state)
  readonly posts = computed(() => this.state().posts);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  // Methods to modify state
  loadPosts() {
    // Simple cache mechanism - don't fetch if already in state
    if (this.state().posts.length > 0) {
      return;
    }

    this.state.update((state) => ({ ...state, loading: true }));

    this.apiService
      .getPosts()
      .pipe(
        map((posts) =>
          posts.map((post, index) => {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() + index); // Each post starts the day after the previous one

            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + ((post.id % 5) + 1)); // Duration from 1 to 5 days

            return {
              ...post,
              imageUrl: `https://picsum.photos/seed/${post.id}/400/600`,
              startDate,
              endDate,
            };
          })
        ),
        tap((posts) => {
          this.state.update((state) => ({
            ...state,
            posts,
            loading: false,
            error: null,
          }));
        }),
        catchError(() => {
          this.state.update((state) => ({
            ...state,
            error: 'Failed to load posts',
            loading: false,
          }));
          return EMPTY;
        })
      )
      .subscribe();
  }
}
