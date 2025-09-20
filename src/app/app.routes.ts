import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./features/posts/post-detail/post-detail').then((m) => m.PostDetail),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./features/posts/post-list/post-list').then((m) => m.PostList),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/posts/favorite-posts/favorite-posts').then((m) => m.FavoritePosts),
  },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
];
