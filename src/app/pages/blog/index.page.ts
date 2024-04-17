import { Component } from '@angular/core';
import { injectContentFiles } from '@analogjs/content';
import PostAttributes from '../../post-attributes';
import { RouterLink } from '@angular/router';
import PostCardComponent from '../../components/post-card.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, PostCardComponent],
  template: `
    <h1>Blog Archive</h1>
    <div class="flex flex-col gap-8">
      @for (post of posts; track post.attributes.slug) {
        <mb-post-card [post]="post.attributes" />
      }
    </div>
  `,
  styles: [
    `
      a {
        text-align: left;
        display: block;
        margin-bottom: 2rem;
      }

      .post__title,
      .post__desc {
        margin: 0;
      }
    `,
  ],
})
export default class BlogComponent {
  readonly posts = injectContentFiles<PostAttributes>();
}
