import { ContentRenderer, injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Meta, Title } from '@angular/platform-browser';
import { map, take, tap } from 'rxjs';
import { PostInfoComponent } from '../../components/post-info.component';
import { PostNavigation } from '../../components/post-navigation/post-navigation.component';
import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, NgOptimizedImage ,PostInfoComponent, PostNavigation],
  template: `
    @if (post$ | async; as post) {
      <article class="pb-8">
        <mb-post-navigation [headings]="headings"></mb-post-navigation>
        <h1>{{ post.attributes.title }}</h1>

        <!-- POST INFO -->
        <div class="flex gap-3 py-4 items-center">
          <img
            class="w-8 h-8 rounded-full"
            ngSrc="https://avatars.githubusercontent.com/u/79775760?v=4"
            height="32"
            width="32"
            alt="Miguel Bermell"
          />
          
          <mb-post-info
            [readingTime]="readingTime()"
            [date]="post.attributes.date"
          />
        </div>

        <img
          class="post__image"
          src="images/{{post.attributes.coverImage}}"
          [alt]="post.attributes.title"
          width="620"
          height="360"
        />

        <!-- CONTENT -->
        <analog-markdown [content]="post.content" />
      </article>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .post__image {
        max-height: 40vh;
        border-radius: 0.5rem;
      }
    `,
  ],
})

export default class PostComponent {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private contentRenderer = inject(ContentRenderer);

  public headings!: any[];

  constructor() {
    this.post$.pipe(take(1)).subscribe((post) => {
      if (typeof post.content === 'string') {
        this.updateContent(post.content, post.attributes);
      }
    });
  }

  readonly post$ = injectContent<PostAttributes>().pipe(
    tap(({ attributes: { title, description, coverImage, slug, date } }) => {
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ name: 'og:description', content: description });
      this.meta.updateTag({ name: 'og:image', content: coverImage });
      this.meta.updateTag({ name: 'og:title', content: title });
      this.meta.updateTag({
        name: 'og:url',
        content: `https://bermell.dev/blog/${slug}`,
      });
    }),
  );
  
  protected readonly readingTime = toSignal(
    this.post$.pipe(
      map(({ content }) => {
        if (typeof content === 'string') {
          const words = content.trim().split(/\s+/).length;
          return Math.ceil(words / 180)
        }
        return 0
      }),
    ),
  );

  private updateContent(content: string, attributes: any) {
    if (!attributes || !content) {
      return;
    }

    this.contentRenderer.render(content).then((body) => {
      this.headings = this.contentRenderer
        .getContentHeadings()
        .filter((h) => h.level <= 4)
        .map((h) => ({
          ...h,
          text: h.text.replace(/<\/?[^>]+(>|$)/g, ''),
        }));
    });
  }
}
