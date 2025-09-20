import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostStoreService } from '../../../core/store/post-store';
import { ApiService } from '../../../core/services/api.service';
import { Loader } from '../../../shared/components/loader/loader';
import { PostItem } from '../post-item/post-item';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, Loader, PostItem],
  templateUrl: './post-list.html',
})
export class PostList implements OnInit {
  readonly store = inject(PostStoreService);
  private readonly apiService = inject(ApiService);

  readonly filter = signal('');
  readonly users = toSignal(this.apiService.getUsers(), { initialValue: [] as User[] });

  readonly filteredPosts = computed(() => {
    const searchTerm = this.filter().toLowerCase();
    if (!searchTerm) {
      return this.store.posts();
    }
    return this.store
      .posts()
      .filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.body.toLowerCase().includes(searchTerm)
      );
  });

  ngOnInit(): void {
    this.store.loadPosts();
  }

  onFilterInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filter.set(input.value);
  }

  onUserChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const userId = select.value ? +select.value : undefined;
    this.store.loadPosts(userId);
  }
}
