import { Component, inject, OnInit, signal } from '@angular/core';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import PostAttributes from '../../post-attributes';
import { RouterLink } from '@angular/router';
import PostCardComponent from '../../components/post-card.component';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MetaService } from '../../services/meta.service';
import { toObservable } from '@angular/core/rxjs-interop';

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
export default class BlogComponent implements OnInit {
  private readonly metaService = inject(MetaService);
  private translocoService = inject(TranslocoService);
  protected readonly searchFilter = signal<string>('');
  readonly files = injectContentFiles<PostAttributes>();

  ngOnInit(): void {
    this.translocoService.langChanges$.pipe(
      switchMap(() => {
        return this.translocoService.selectTranslate('blog.description');
      })
    ).subscribe(description => {
      this.metaService.updateMetaTags({
        title: 'Bermell Blog 👨‍💻',
        description: description,
        img: 'logo.png'
      });
    });
  }

  readonly posts$: Observable<ContentFile<PostAttributes>[]> = combineLatest([
    this.translocoService.langChanges$,
    toObservable(this.searchFilter)
  ]).pipe(
    map(([lang, searchQuery]) => this.filterPosts(lang, searchQuery))
  );

  private sanitizeSearchQuery(query: string): string {
    return query.replace(/<script.*?>.*?<\/script>/gi, '')
                .replace(/<[\/\!]*?[^<>]*?>/gi, '')
                .replace(/<style.*?>.*?<\/style>/gi, '')
                .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
  }

  private filterPosts(lang: string, searchQuery: string): ContentFile<PostAttributes>[] {
    const sanitizeQuery = this.sanitizeSearchQuery(searchQuery);

    return this.files.filter(post => {
      const language = post.filename.split('/')[3];
      const isLanguageMatch = lang === language;

      const joined = `${post.attributes.title} ${post.attributes.description} ${post.attributes.tags.join(' ')}`;
      const isSearchMatch = joined.toLowerCase().includes(sanitizeQuery.toLowerCase());
  
      return isLanguageMatch && isSearchMatch;
    }).map((post) => {
      const language = post.filename.split('/')[3];
      return {
        ...post,
        attributes: {
          ...post.attributes,
          language,
        },
      };
    });
  }

}
