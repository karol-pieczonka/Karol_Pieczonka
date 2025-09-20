import { Routes } from '@angular/router';
import { PostList } from './features/posts/post-list/post-list';
import { PostDetail } from './features/posts/post-detail/post-detail';
import { FavoritePosts } from './features/posts/favorite-posts/favorite-posts';

export const routes: Routes = [
  { path: 'posts/:id', component: PostDetail },
  { path: 'posts', component: PostList },
  { path: 'favorites', component: FavoritePosts },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
];
