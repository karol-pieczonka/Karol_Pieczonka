import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from '../../../core/models/post.model';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-item.html',
})
export class PostItem {
  @Input({ required: true }) post!: Post;
}
