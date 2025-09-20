import { Component, Input } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-post-comments',
  standalone: true,
  imports: [],
  templateUrl: './post-comments.html',
})
export class PostComments {
  @Input({ required: true }) comments!: Comment[];
}
