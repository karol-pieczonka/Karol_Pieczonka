import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { ApiService } from '../../../core/services/api.service';
import { Loader } from '../../../shared/components/loader/loader';

import { PostComments } from '../post-comments/post-comments';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, Loader, PostComments, RouterLink],
  templateUrl: './post-detail.html',
})
export class PostDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  private readonly data$ = this.route.params.pipe(
    map((params) => +params['id']),
    switchMap((id) =>
      this.apiService.getPost(id).pipe(
        switchMap((post) =>
          forkJoin({
            user: this.apiService.getUser(post.userId),
            comments: this.apiService.getComments(post.id),
          }).pipe(
            map(({ user, comments }) => ({
              post: {
                ...post,
                imageUrl: `https://picsum.photos/seed/${post.id}/1200/800`,
              },
              user,
              comments,
            }))
          )
        )
      )
    )
  );

  private readonly data = toSignal(this.data$);

  readonly post = computed(() => this.data()?.post);
  readonly user = computed(() => this.data()?.user);
  readonly comments = computed(() => this.data()?.comments);
}
