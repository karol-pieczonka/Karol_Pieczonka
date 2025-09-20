import { computed, inject, Injectable, signal } from '@angular/core';
import { EMPTY, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { ApiService } from '../services/api.service';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  userId?: number;
  favoritePostIds: number[];
}

@Injectable({
  providedIn: 'root',
})
export class PostStoreService {
  private readonly apiService = inject(ApiService);

  private readonly state = signal<PostsState>({
    posts: [],
    loading: false,
    error: null,
    favoritePostIds: [],
  });

  readonly posts = computed(() => {
    const state = this.state();
    return state.posts.map((post) => ({
      ...post,
      isFavorite: state.favoritePostIds.includes(post.id),
    }));
  });
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly favoritePostIds = computed(() => this.state().favoritePostIds);

  loadPosts(userId?: number) {
    if (this.state().posts.length > 0 && this.state().userId === userId) {
      return;
    }

    this.state.update((state) => ({ ...state, loading: true, userId }));

    this.apiService
      .getPosts(userId)
      .pipe(
        map((posts) =>
          posts.map((post, index) => {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() + index);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + ((post.id % 5) + 1));
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

  toggleFavorite(postId: number) {
    this.state.update((state) => {
      const favorites = state.favoritePostIds;
      const newFavorites = favorites.includes(postId)
        ? favorites.filter((id) => id !== postId)
        : [...favorites, postId];
      return { ...state, favoritePostIds: newFavorites };
    });
  }
}
