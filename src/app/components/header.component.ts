import { Component, inject, ViewEncapsulation } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  Router,
  NavigationEnd,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';
import { SwitchLangComponent } from './switch-lang.component';
import { SearchBarComponent } from './search-bar.component';
@Component({
  selector: 'mb-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslocoDirective,
    SwitchLangComponent,
    SearchBarComponent,
  ],
  template: `
    <header class="w-full relative">
      @if (isOpenSearchBar) {
        <mb-search-bar (toggleSearch)="toggleSearch()" />
      }
      <div class="container mx-auto">
        <div
          class="relative z-40 flex flex-row items-center justify-between pb-2 pt-5 md:mb-1"
        >
          <div class="flex flex-row items-center py-1">
            <div class="md:hidden dark:text-white">
              <button
                type="button"
                (click)="toggleSidebar()"
                aria-label="Open blog links"
                class="focus-ring-base flex flex-row items-center rounded-full font-medium transition duration-100 ease-in-out focus-ring-colors-base hover:bg-black/10 dark:hover:bg-white/20 mr-2 p-2"
              >
                <svg
                  class="h-6 w-6 stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.9889 11.9969H11.9945H3M20.9889 17.8745H3M21 6.12451H3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="hidden pl-1 md:block">
              <img
                src="./images/logo.png"
                alt="Bermell logo"
                class="w-36 cursor-pointer transition-transform ease-out duration-300 hover:scale-110"
                height="62"
                width="62"
                [routerLink]="['/']"
              />
            </div>
          </div>
          <div class="flex flex-row items-center text-white/90">
            <button
              (click)="toggleSearch()"
              type="button"
              aria-label="search"
              class="flex flex-row items-center rounded-full font-medium transition duration-200 ease-in-out  hover:bg-slate-500/30 dark:hover:bg-white/60 mr-2 p-2"
            >
              <svg
                class="h-6 w-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15.8091 15.8091M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <a
              class="flex flex-row items-center rounded-full mr-2 border-1-1/2 bg-transparent p-2 transition-colors duration-150 focus-ring-base border-blue-50 text-blue-50 hover:bg-slate-500/30 dark:border-white dark:text-white hover:dark:bg-slate-800 focus-ring-colors-base"
              href="mailto:hola@bermell.dev"
              rel="noopener nofollow"
            >
              <svg
                class="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1367 7.50493C13.551 7.50493 13.8867 7.16914 13.8867 6.75493C13.8867 6.34071 13.551 6.00493 13.1367 6.00493V7.50493ZM19.9024 13.0846C19.9024 12.6704 19.5666 12.3346 19.1524 12.3346C18.7382 12.3346 18.4024 12.6704 18.4024 13.0846H19.9024ZM2.5013 9.95291C2.1333 9.76278 1.68084 9.90697 1.49071 10.275C1.30058 10.643 1.44477 11.0954 1.81277 11.2855L2.5013 9.95291ZM16.5938 12.1078C16.9382 11.8778 17.031 11.412 16.8009 11.0676C16.5709 10.7231 16.1051 10.6304 15.7607 10.8604L16.5938 12.1078ZM16.2825 6.01303C15.8683 6.01303 15.5325 6.34882 15.5325 6.76303C15.5325 7.17725 15.8683 7.51303 16.2825 7.51303V6.01303ZM22 7.51303C22.4142 7.51303 22.75 7.17725 22.75 6.76303C22.75 6.34882 22.4142 6.01303 22 6.01303V7.51303ZM18.3913 9.62177C18.3913 10.036 18.727 10.3718 19.1413 10.3718C19.5555 10.3718 19.8913 10.036 19.8913 9.62177H18.3913ZM19.8913 3.9043C19.8913 3.49008 19.5555 3.1543 19.1413 3.1543C18.727 3.1543 18.3913 3.49008 18.3913 3.9043H19.8913ZM8.27708 13.7812L7.93282 14.4475L8.27708 13.7812ZM10.1277 14.5662L10.0103 15.307L10.1277 14.5662ZM11.3949 14.4952L11.1955 13.7722L11.3949 14.4952ZM18.4024 18.1899C18.4024 18.8282 17.8849 19.3457 17.2466 19.3457V20.8457C18.7134 20.8457 19.9024 19.6566 19.9024 18.1899H18.4024ZM17.2466 19.3457H3.90583V20.8457H17.2466V19.3457ZM3.90583 19.3457C3.26748 19.3457 2.75 18.8282 2.75 18.1899H1.25C1.25 19.6566 2.43905 20.8457 3.90583 20.8457V19.3457ZM2.75 18.1899V8.66075H1.25V18.1899H2.75ZM2.75 8.66075C2.75 8.02241 3.26748 7.50493 3.90583 7.50493V6.00493C2.43905 6.00493 1.25 7.19398 1.25 8.66075H2.75ZM3.90583 7.50493H13.1367V6.00493H3.90583V7.50493ZM19.9024 18.1899V13.0846H18.4024V18.1899H19.9024ZM1.81277 11.2855L7.93282 14.4475L8.62134 13.1149L2.5013 9.95291L1.81277 11.2855ZM13.5627 14.1321L16.5938 12.1078L15.7607 10.8604L12.7297 12.8847L13.5627 14.1321ZM16.2825 7.51303H19.1413V6.01303H16.2825V7.51303ZM19.1413 7.51303H22V6.01303H19.1413V7.51303ZM19.8913 9.62177V6.76303H18.3913V9.62177H19.8913ZM19.8913 6.76303V3.9043H18.3913V6.76303H19.8913ZM7.93282 14.4475C8.80209 14.8966 9.38471 15.2078 10.0103 15.307L10.2451 13.8255C9.91517 13.7732 9.58255 13.6115 8.62134 13.1149L7.93282 14.4475ZM12.7297 12.8847C11.8299 13.4856 11.5175 13.6834 11.1955 13.7722L11.5943 15.2182C12.2049 15.0498 12.7491 14.6755 13.5627 14.1321L12.7297 12.8847ZM10.0103 15.307C10.5386 15.3907 11.0786 15.3604 11.5943 15.2182L11.1955 13.7722C10.8861 13.8575 10.562 13.8757 10.2451 13.8255L10.0103 15.307Z"
                ></path>
              </svg>
            </a>
            <div class="h-10 w-10 rounded-full">
              <button
                type="button"
                class="flex flex-row items-center rounded-full font-medium  p-2"
              >
                <mb-switch-lang />
              </button>
            </div>
          </div>
        </div>
        <div
          class="mx-auto my-4 flex w-2/3 flex-row items-center justify-center md:hidden"
        >
          <img
            src="./images/logo.png"
            alt="Bermell logo"
            class="w-28 cursor-pointer transition-transform ease-out duration-300 hover:scale-110"
            height="52"
            width="52"
            [routerLink]="['/']"
          />
        </div>
        <div>
          <div class="mx-0 mb-2 hidden w-full flex-row items-center md:flex">
            <div
              class="flex flex-row flex-wrap gap-y-2 justify-center gap-x-1.5 text-slate-700 dark:text-slate-300"
            >
              <a
                href="https://twitter.com/drifkinho"
                aria-label="Find me on twitter"
                target="_blank"
                rel="me noopener"
                class="focus-ring-base flex flex-row items-center justify-center rounded-full p-2 transition-colors duration-150 focus-ring-colors-base hover:bg-slate-500/30 dark:hover:bg-white/60"
                ><svg
                  class="h-5 w-5 stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.643 13.346L4.26862 4.86856C3.85863 4.32329 4.2478 3.54408 4.93001 3.54431L7.2184 3.54508C7.47633 3.54517 7.71945 3.66557 7.87585 3.87066L12.9065 10.4675M10.643 13.346L5.19311 20.5093M10.643 13.346L15.8028 20.077C15.9588 20.2805 16.2003 20.4001 16.4567 20.4009L18.7925 20.4082C19.4778 20.4104 19.8683 19.6261 19.4536 19.0805L12.9065 10.4675M12.9065 10.4675L18.2181 3.50928"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path></svg></a
              ><a
                href="https://github.com/miguel-bermell"
                aria-label="Find me on Github"
                target="_blank"
                rel="me noopener"
                class="focus-ring-base flex flex-row items-center justify-center rounded-full p-2 transition-colors duration-150 focus-ring-colors-base hover:bg-slate-500/30 dark:hover:bg-white/60"
                ><svg class="h-5 w-5 fill-current" viewBox="0 0 496 512">
                  <path
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path></svg></a
              ><a
                href="https://www.linkedin.com/in/miguelbermell/"
                aria-label="Find me on LinkedIn"
                target="_blank"
                rel="me noopener"
                class="focus-ring-base flex flex-row items-center justify-center rounded-full p-2 transition-colors duration-150 focus-ring-colors-base hover:bg-slate-500/30 dark:hover:bg-white/60"
                ><svg class="h-5 w-5 fill-current" viewBox="0 0 448 512">
                  <path
                    d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                  ></path></svg></a
              ><a
                href="/api/rss.xml"
                aria-label="Blog XML"
                target="_blank"
                rel="me noopener"
                class="focus-ring-base flex flex-row items-center justify-center rounded-full p-2 transition-colors duration-150 focus-ring-colors-base hover:bg-slate-500/30 dark:hover:bg-white/60"
                ><svg class="h-5 w-5 fill-current" viewBox="0 0 448 512">
                  <path
                    d="M80 368c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32m0-48c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80zm367.996 147.615c-6.449-237.834-198.057-429.163-435.61-435.61C5.609 31.821 0 37.229 0 44.007v24.02c0 6.482 5.147 11.808 11.626 11.992 211.976 6.04 382.316 176.735 388.354 388.354.185 6.479 5.51 11.626 11.992 11.626h24.02c6.78.001 12.187-5.608 12.004-12.384zm-136.239-.05C305.401 305.01 174.966 174.599 12.435 168.243 5.643 167.977 0 173.444 0 180.242v24.024c0 6.431 5.072 11.705 11.497 11.98 136.768 5.847 246.411 115.511 252.258 252.258.275 6.425 5.549 11.497 11.98 11.497h24.024c6.797-.001 12.264-5.644 11.998-12.436z"
                  ></path></svg
              ></a>
            </div>
          </div>
          <div
            class="relative hidden flex-row items-center justify-center overflow-hidden md:flex"
          >
            <div class="overflow-hidden">
              <nav
                *transloco="let t; read: 'navigation'"
                class="relative flex flex-row flex-nowrap items-end whitespace-nowrap px-2 pt-2"
              >
                @for (link of links; track link.id) {
                  <a
                    class="flex items-center justify-center border-b-2 border-transparent px-2 capitalize focus:outline-none"
                    [routerLink]="link.url"
                    routerLinkActive="text-[var(--primary)] font-semibold"
                    [routerLinkActiveOptions]="{ exact: true }"
                    ><span
                      class="block rounded-lg px-2 py-1 ring-offset-2 transition-colors duration-150 group-focus:ring hover:text-slate-600 hover:bg-slate-100 group-focus:ring-blue-600 group-focus:ring-offset-white dark:text-white dark:hover:bg-slate-800 dark:group-focus:ring-offset-slate-800 text-opacity-100 dark:text-opacity-100"
                      >{{ t(link.name) }}</span
                    >
                  </a>
                }
              </nav>
              <div class="ps__rail-x" style="left: 0px; top: 0px;">
                <div
                  class="ps__thumb-x"
                  tabindex="0"
                  style="left: 0px; width: 0px;"
                ></div>
              </div>
              <div class="ps__rail-y" style="top: 0px; left: 0px;">
                <div
                  class="ps__thumb-y"
                  tabindex="0"
                  style="top: 0px; height: 0px;"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative z-50"
        [ngStyle]="{
          opacity: isOpen ? '1' : '0',
          visibility: isOpen ? 'visible' : 'hidden'
        }"
      >
        <div
          (click)="toggleSidebar()"
          class="fixed inset-0 bg-gray-800 opacity-75"
        ></div>
        <nav
          [ngClass]="{ 'translate-x-0 ': isOpen, '-translate-x-full': !isOpen }"
          class="fixed top-0 left-0 bottom-0 flex flex-col w-4/6 max-w-sm py-6 px-6 bg-gray-600 border-r overflow-y-auto transform duration-500 ease-out"
        >
          <div class="flex items-center mb-8">
            <a
              class="mr-auto brightness-75 text-3xl font-bold leading-none"
              [routerLink]="['/']"
            >
              <img
                src="./images/logo.png"
                alt="Bermell logo"
                class="w-28 cursor-pointer transition-transform ease-out duration-300 hover:scale-110"
                height="52"
                width="52"
              />
            </a>
            <button (click)="toggleSidebar()" class="navbar-close">
              <svg
                class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul class="list-none" *transloco="let t; read: 'navigation'">
              @for (link of links; track link.id) {
                <li class="mb-1 text-gray-900">
                  <a
                    class="block p-4 text-sm font-semibold hover:bg-blue-50 hover:text-gray-700 rounded"
                    [routerLink]="link.url"
                    routerLinkActive="text-[var(--primary)]"
                    [routerLinkActiveOptions]="{ exact: true }"
                    >{{ t(link.name) }}</a
                  >
                </li>
              }
            </ul>
          </div>
          <div class="mt-auto">
            <div
              class="flex flex-row flex-wrap gap-y-2 justify-center gap-x-1.5 text-gray-100 dark:text-slate-300"
            >
              <a
                href="https://twitter.com/drifkinho"
                aria-label="Find me on Twitter"
                target="_blank"
                rel="me noopener"
                class="focus-ring-base flex flex-row items-center justify-center rounded-full p-2 transition-colors duration-150 focus-ring-colors-base hover:bg-black/10 dark:hover:bg-white/20"
                ><svg
                  class="h-5 w-5 stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.643 13.346L4.26862 4.86856C3.85863 4.32329 4.2478 3.54408 4.93001 3.54431L7.2184 3.54508C7.47633 3.54517 7.71945 3.66557 7.87585 3.87066L12.9065 10.4675M10.643 13.346L5.19311 20.5093M10.643 13.346L15.8028 20.077C15.9588 20.2805 16.2003 20.4001 16.4567 20.4009L18.7925 20.4082C19.4778 20.4104 19.8683 19.6261 19.4536 19.0805L12.9065 10.4675M12.9065 10.4675L18.2181 3.50928"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path></svg></a
              ><a
                href="https://github.com/miguel-bermell"
                aria-label="Find me on Github"
                target="_blank"
                rel="me noopener"
                class="focus-ring-base flex flex-row items-center justify-center rounded-full p-2 transition-colors duration-150 focus-ring-colors-base hover:bg-black/10 dark:hover:bg-white/20"
                ><svg class="h-5 w-5 fill-current" viewBox="0 0 496 512">
                  <path
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path></svg></a
              ><a
                href="https://www.linkedin.com/in/miguelbermell/"
                aria-label="Find me on LinkedIn"
                target="_blank"
                rel="me noopener"
                class="focus-ring-base flex flex-row items-center justify-center rounded-full p-2 transition-colors duration-150 focus-ring-colors-base hover:bg-black/10 dark:hover:bg-white/20"
                ><svg class="h-5 w-5 fill-current" viewBox="0 0 448 512">
                  <path
                    d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                  ></path></svg></a
              ><a
                href="/api/rss.xml"
                aria-label="Blog XML"
                target="_blank"
                rel="me noopener"
                class="focus-ring-base flex flex-row items-center justify-center rounded-full p-2 transition-colors duration-150 focus-ring-colors-base hover:bg-black/10 dark:hover:bg-white/20"
                ><svg class="h-5 w-5 fill-current" viewBox="0 0 448 512">
                  <path
                    d="M80 368c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32m0-48c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80zm367.996 147.615c-6.449-237.834-198.057-429.163-435.61-435.61C5.609 31.821 0 37.229 0 44.007v24.02c0 6.482 5.147 11.808 11.626 11.992 211.976 6.04 382.316 176.735 388.354 388.354.185 6.479 5.51 11.626 11.992 11.626h24.02c6.78.001 12.187-5.608 12.004-12.384zm-136.239-.05C305.401 305.01 174.966 174.599 12.435 168.243 5.643 167.977 0 173.444 0 180.242v24.024c0 6.431 5.072 11.705 11.497 11.98 136.768 5.847 246.411 115.511 252.258 252.258.275 6.425 5.549 11.497 11.98 11.497h24.024c6.797-.001 12.264-5.644 11.998-12.436z"
                  ></path></svg
              ></a>
            </div>
            <p class="my-4 text-xs text-center text-gray-400">
              <span>© 2024 Miguel Bermell</span>
            </p>
          </div>
        </nav>
      </div>
    </header>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  public isOpen = false;
  public isOpenSearchBar = false;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isOpen = false;
      }
    });
  }

  protected readonly links = [
    { id: 1, name: 'home', url: '/home' },
    { id: 2, name: 'blog', url: '/blog' },
    // { id: 3, name: 'about', url: '/about' },
  ];

  public toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  public toggleSearch() {
    this.isOpenSearchBar = !this.isOpenSearchBar;
  }
}
