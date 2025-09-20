import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostStoreService } from '../../../core/store/post-store';
import { PostItem } from '../post-item/post-item';
import { Loader } from '../../../shared/components/loader/loader';

@Component({
  selector: 'app-favorite-posts',
  standalone: true,
  imports: [CommonModule, PostItem, Loader],
  templateUrl: './favorite-posts.html',
})
export class FavoritePosts {
  readonly store = inject(PostStoreService);

  readonly favoritePosts = computed(() => {
    return this.store.posts().filter((post) => post.isFavorite);
  });
}
