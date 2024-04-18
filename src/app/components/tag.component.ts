import { Component, Input, input, OnInit } from '@angular/core';
import { TAGS } from '../utils/tags';

@Component({
  selector: 'mb-tag',
  standalone: true,
  template: `
  <div class="tag" [style.background-image]="'url(' + tagImage + ')'">
    {{ tag() }}
  </div>
  `,
  styles: `
    .tag {
      padding: 8px 39px 8px 8px;
      overflow: hidden;
      font: 700 12px / 1.5 OpenSans, Arial, sans-serif;
      background: rgba(39, 42, 62, 0.55);
      background-repeat: no-repeat;
      background-position: right;
      background-size: contain;
      border-radius: .5rem;
      box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.0836);
      cursor: pointer;
    }
  `,
})
export class TagComponent implements OnInit {
  tag = input.required<keyof typeof TAGS>()
  public tagImage!: string

  ngOnInit(): void {
    this.tagImage = TAGS[this.tag()]
  }
}
