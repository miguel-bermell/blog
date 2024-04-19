import { Component, inject } from '@angular/core';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import PostAttributes from '../../post-attributes';
import { RouterLink } from '@angular/router';
import PostCardComponent from '../../components/post-card.component';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, AsyncPipe, TranslocoDirective, PostCardComponent],
  template: `
    <ng-container *transloco="let t; read: 'blog'">
      <h1>{{ t('title') }}</h1>
      <div class="flex flex-col gap-8">
        @for (post of posts$ | async; track post.attributes.slug) {
          <mb-post-card [post]="post.attributes" />
        }
      </div>
    </ng-container>
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
  readonly files = injectContentFiles<PostAttributes>();
  readonly posts$: Observable<ContentFile<PostAttributes>[]> = inject(
    TranslocoService,
  ).langChanges$.pipe(
    map((lang) => {
      return this.files
        .filter((post) => {
          const language = post.filename.split('/')[3];
          return lang === language;
        })
        .map((post) => {
          const language = post.filename.split('/')[3];
          return {
            ...post,
            attributes: {
              ...post.attributes,
              language,
            },
          };
        });
    }),
  );
}
