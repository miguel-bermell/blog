import { ContentFile, injectContentFiles } from '@analogjs/content';
import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { combineLatest, map, Observable } from 'rxjs';
import PostAttributes from '../post-attributes';
import { DateComponent } from './date.component';
import PostSearchResultComponent from './post-search-result.component';

@Component({
  selector: 'mb-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DateComponent,
    PostSearchResultComponent,
    TranslocoDirective,
  ],
  template: `
    <div>
      <div
        (click)="onToggleSearch()"
        data-state="open"
        class="fixed inset-0 z-50 flex flex-row justify-center items-center bg-gray-700 dark:bg-slate-600 opacity-75"
      ></div>
      <div
        class="fixed left-0 right-0 top-0 z-50 mx-2 mt-32 flex max-w-[1100px] flex-col items-center overflow-hidden rounded-2xl border-slate-200 bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md p-6 dark:border-slate-800 dark:bg-slate-900 md:mx-8 lg:mx-auto md:max-h-50"
        *transloco="let t; read: 'header'"
      >
        <input
          #searchBox
          type="search"
          placeholder="{{ t('search') }}..."
          class="p-2 rounded w-full outline-1 focus:outline-[var(--primary)] focus:outline"
          (keyup)="searchFilter.set(searchBox.value)"
          (search)="searchFilter.set(searchBox.value)"
        />
        <div class="mt-5 p-2 max-h-96 overflow-y-auto">
          @for (post of posts$ | async; track post.attributes.slug) {
            <div class="post mb-3">
              <mb-post-search-result [post]="post.attributes" />
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .post:last-child {
      margin-bottom: 0;
    }
  `,
})
export class SearchBarComponent implements AfterViewInit {
  private translocoService = inject(TranslocoService);
  private readonly router = inject(Router);
  protected readonly searchFilter = signal<string>('');
  readonly files = injectContentFiles<PostAttributes>();

  @Output() toggleSearch: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onToggleSearch();
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onToggleSearch();
    }
  }

  readonly posts$: Observable<ContentFile<PostAttributes>[]> = combineLatest([
    this.translocoService.langChanges$,
    toObservable(this.searchFilter),
  ]).pipe(map(([lang, searchQuery]) => this.filterPosts(lang, searchQuery)));

  private sanitizeSearchQuery(query: string): string {
    return query
      .replace(/<script.*?>.*?<\/script>/gi, '')
      .replace(/<[\/\!]*?[^<>]*?>/gi, '')
      .replace(/<style.*?>.*?<\/style>/gi, '')
      .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
  }

  private filterPosts(
    lang: string,
    searchQuery: string,
  ): ContentFile<PostAttributes>[] {
    const sanitizeQuery = this.sanitizeSearchQuery(searchQuery);

    return this.files
      .filter((post) => {
        const isLanguageMatch = lang === this.getLangFromPost(post);

        const joined = `${post.attributes.title} ${post.attributes.description} ${post.attributes.tags.join(' ')}`;
        const isSearchMatch = joined
          .toLowerCase()
          .includes(sanitizeQuery.toLowerCase());

        return isLanguageMatch && isSearchMatch && sanitizeQuery.length >= 2;
      })
      .map((post) => ({
        ...post,
        attributes: {
          ...post.attributes,
          language: this.getLangFromPost(post),
        },
      }));
  }

  private getLangFromPost(post: ContentFile<PostAttributes>) {
    return post.filename.split('/')[3];
  }

  ngAfterViewInit() {
    if (this.searchBox) {
      this.searchBox.nativeElement.focus();
    }
  }

  onToggleSearch() {
    this.toggleSearch.emit();
  }
}
