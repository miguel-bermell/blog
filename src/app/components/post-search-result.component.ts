import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import PostAttributes from '../post-attributes';
import { TAGS } from '../utils/tags';
import { TagComponent } from './tag.component';
import { DateComponent } from './date.component';

@Component({
  selector: 'mb-post-search-result',
  standalone: true,
  imports: [RouterLink, TagComponent, DateComponent],
  template: `
    @if (post(); as post) {
      <article
        class="w-full rounded-xl overflow-hidden shadow-xl border border-gray-600"
      >
        <a
          [routerLink]="['/blog/', post.slug]"
          class="rounded-xl overflow-hidden px-5 pt-5 grow flex flex-col backdrop-blur hover:backdrop-brightness-90 transition-all duration-150"
        >
          <div class="grow">
            <span class="text-2xl block">{{ post.title }}</span>
            <small><mb-date [date]="post.date" /></small>
            <p class="my-3 text-sm">{{ post.description }}</p>
          </div>
          <div class="flex flex-wrap gap-3 pb-3">
            @for (tag of post.tags; track tag) {
              <div class="py-0.5">
                <mb-tag [tag]="tag"></mb-tag>
              </div>
            }
          </div>
        </a>
      </article>
    }
  `,
})
export default class PostSearchResultComponent {
  tags = TAGS;
  post = input.required<PostAttributes>();
}
