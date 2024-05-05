import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly baseUrl = environment.baseUrl;

  updateMetaTags(attributes: { title: string; description: string; img: string; }): void {
    this.title.setTitle(attributes.title);
    this.meta.updateTag({ name: 'description', content: attributes.description });
    this.meta.updateTag({ property: 'og:title', content: attributes.title });
    this.meta.updateTag({ property: 'og:description', content: attributes.description });
    this.meta.updateTag({ property: 'og:image', content: `${this.baseUrl}/images/${attributes.img}` });
  }
}
