import { Routes } from '@angular/router';
import { PostList } from './features/posts/post-list/post-list';

export const routes: Routes = [
  { path: 'posts', component: PostList },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
];
