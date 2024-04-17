import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'mb-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="flex justify-between items-center py-4 md:py-8">
      <div class="flex items-center">
        <img
          src="./images/logo.png"
          alt="Bermell logo"
          class="w-28 cursor-pointer transition-transform ease-out duration-300 hover:scale-110"
          height="52"
          width="52"
          [routerLink]="['/']"
        />
        <nav>
          <ul class="flex list-none items-center ml-10">
            @for (link of links; track link.id) {
              <li class="ml-0">
                <a
                  class="no-underline weight font-bold text-shadow px-4 transition-colors duration-300"
                  [routerLink]="link.url"
                  routerLinkActive="text-[var(--secondary)]"
                  [routerLinkActiveOptions]="{ exact: true }"
                >
                  {{ link.text }}
                </a>
              </li>
            }
          </ul>
        </nav>
      </div>
      <div class="flex items-center">
        <a
          class="inline-flex justify-center rounded-full border-transparent border p-1.5 outline-2 outline-offset-2 transition-colors hover:border-gray-400 lg:block"
          href="/api/rss.xml"
        >
          <svg class="w-6 h-6" fill="currentColor">
            <use xlink:href="/icons/rss.svg#rss-icon"></use>
          </svg>
        </a>
      </div>
    </header>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  protected readonly links = [
    { id: 1, text: 'Home', url: '/home' },
    { id: 2, text: 'Blog', url: '/blog' },
    { id: 3, text: 'About', url: '/about' },
  ];
}
