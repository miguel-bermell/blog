import {
  ContentFile,
  ContentRenderer,
  injectContent,
  injectContentFiles,
  MarkdownComponent,
} from '@analogjs/content';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  Component,
  inject,
  Injector,
  OnDestroy,
  OnInit,
  runInInjectionContext,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import {
  combineLatest,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { PostInfoComponent } from '../../components/post-info.component';
import { PostNavigation } from '../../components/post-navigation/post-navigation.component';
import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    AsyncPipe,
    MarkdownComponent,
    NgOptimizedImage,
    PostInfoComponent,
    PostNavigation,
  ],
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
          src="images/{{ post.attributes.coverImage }}"
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
export default class PostComponent implements OnInit, OnDestroy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private contentRenderer = inject(ContentRenderer);
  private transloco = inject(TranslocoService);
  readonly allFiles = injectContentFiles<PostAttributes>();
  injector = inject(Injector);
  router = inject(Router);
  private destroy$ = new Subject<void>();
  headings: any = [];

  readonly post$ = this.transloco.langChanges$.pipe(
    switchMap(lang => this.fetchPostAndFiles(lang)),
    tap(post => this.handlePost(post))
  );

  ngOnInit(): void {
    this.handleLanguageChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateRouteBasedOnLanguage(route: string, lang: string): string {
    const hashIndex = route.indexOf('#');
    const baseUrl = hashIndex > -1 ? route.substring(0, hashIndex) : route;
    const fragment = hashIndex > -1 ? route.substring(hashIndex) : '';

    const segments = baseUrl.split('/');

    const file = this.allFiles.find((file) => file.slug === segments[2]);
    const fileLang = file?.filename.split('/')[3];

    if (fileLang === lang) {
      return route;
    }

    const updatedBaseUrl = segments.join('/');
    return updatedBaseUrl + fragment;
  }

  private fetchPostAndFiles(lang: string) {
    return combineLatest([
      of(this.allFiles.filter(file => file.filename.split('/')[3] === lang)),
      runInInjectionContext(this.injector, () =>
        injectContent<PostAttributes>({ param: 'slug', subdirectory: lang })
      )
    ]).pipe(map(([_files, post]) => ({ ...post })));
  }

  private handlePost(post: ContentFile<any>) {
    if (typeof post.content === 'string') {
      this.updateMetaTags(post.attributes);
      this.updateContent(post.content, post.attributes);
    }
  }

  private handleLanguageChanges() {
    this.transloco.langChanges$.pipe(takeUntil(this.destroy$)).subscribe(lang => {
      const currentRoute = this.router.url;
      const newRoute = this.updateRouteBasedOnLanguage(currentRoute, lang);
      this.router.navigateByUrl(newRoute, { skipLocationChange: false });
    });
  }

  private updateMetaTags(attributes: PostAttributes) {
    this.title.setTitle(attributes.title);
    this.meta.updateTag({
      name: 'description',
      content: attributes.description,
    });
    this.meta.updateTag({
      name: 'og:description',
      content: attributes.description,
    });
    this.meta.updateTag({ name: 'og:image', content: attributes.coverImage });
    this.meta.updateTag({ name: 'og:title', content: attributes.title });
    this.meta.updateTag({
      name: 'og:url',
      content: `https://bermell.dev/blog/${attributes.slug}`,
    });
  }

  protected readonly readingTime = toSignal(
    this.post$.pipe(
      map(({ content }) => {
        if (typeof content === 'string') {
          const words = content.trim().split(/\s+/).length;
          return Math.ceil(words / 180);
        }
        return 0;
      }),
    ),
  );

  private updateContent(content: string, attributes: any) {
    if (!attributes || !content) {
      return;
    }

    this.contentRenderer.render(content).then((_body) => {
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
