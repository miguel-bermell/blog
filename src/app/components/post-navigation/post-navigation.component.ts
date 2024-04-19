import {TableOfContentItem} from '@analogjs/content/lib/content-renderer';
import {NgFor, NgIf} from '@angular/common';
import {Component, inject, signal, Input} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'mb-post-navigation',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, TranslocoDirective],
  template: `
    <aside>
      <nav>
          <header *transloco="let t; read: 'blog'">
            <h2>{{ t('navigationTitle') }}</h2>
          </header>
          <ul>
            <li
              *ngFor="let item of headings"
              class="nav-item"
              [class.nav-item-h3]="item.level === 3"
              [class.nav-item-active]="item.id === activeItemId()"
            >
              <a [href]="getPostUrl() + '#' + item.id" >{{ item.text }}</a>
            </li>
          </ul>
      </nav>
    </aside>
  `,
  styleUrls: ['./post-navigation.component.scss'],
  host: {
    class: 'fixed right-4 flex',
  },
})
export class PostNavigation {
  @Input() headings: TableOfContentItem[] = [];

  activeItemId = signal('');

  constructor(private router: Router) {
    inject(ActivatedRoute)
      .fragment.pipe(takeUntilDestroyed())
      .subscribe((fragment) => {
        this.activeItemId.set(fragment!);
      });
  }

  getPostUrl(): string {
    return this.router.url.split('#')[0];
  }
}
