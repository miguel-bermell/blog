import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import PostAttributes from '../post-attributes';
import { TAGS } from '../utils/tags';
import { TagComponent } from './tag.component';
import { DateComponent } from './date.component';

@Component({
  selector: 'mb-post-card',
  standalone: true,
  imports: [RouterLink, TagComponent, DateComponent],
  template: `
    @if (post(); as post) {
      <div
        class="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-xl border border-gray-600"
      >
        <img
          width="500"
          priority
          height="360"
          class="w-full md:w-5/12 "
          src="images/{{post.coverImage}}"
          [alt]="post.title"
        />

        <a
          [routerLink]="['/blog/', post.slug]"
          class="px-5 pt-5 grow flex flex-col backdrop-blur hover:backdrop-brightness-90 transition-all duration-150"
        >
          <div class="grow">
            <span class="text-4xl block">{{ post.title }}</span>
            <small><mb-date [date]="post.date" /></small>
            <p class="post__desc">{{ post.description }}</p>
          </div>
          <div class="flex flex-wrap gap-3 pb-3">
            @for (tag of post.tags; track tag) {
              <div class="py-0.5">
              <mb-tag [tag]="tag"></mb-tag>
              </div>
            }
          </div>
        </a>
      </div>
    }
  `,
  styles: [
    `
      img {
        aspect-ratio: 16 / 11;
      }
    `,
  ],
})
export default class PostCardComponent {
  tags = TAGS;
  post = input.required<PostAttributes>();
}
