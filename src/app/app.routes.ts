import { Routes } from '@angular/router';
import { PostList } from './features/posts/post-list/post-list';
import { PostDetail } from './features/posts/post-detail/post-detail';

export const routes: Routes = [
  { path: 'posts/:id', component: PostDetail },
  { path: 'posts', component: PostList },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
];
