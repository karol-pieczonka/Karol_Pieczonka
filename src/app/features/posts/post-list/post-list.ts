import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostStoreService } from '../../../core/store/post-store';
import { Loader } from '../../../shared/components/loader/loader';
import { PostItem } from '../post-item/post-item';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, Loader, PostItem],
  templateUrl: './post-list.html',
})
export class PostList implements OnInit {
  readonly store = inject(PostStoreService);

  ngOnInit(): void {
    this.store.loadPosts();
  }
}
