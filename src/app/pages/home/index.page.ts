import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <section class="max-w-4xl mx-auto">
      <h1>Welcome to my personal space!</h1>

      <p class="mt-4">
        I am <strong>Miguel García Bermell</strong>, a full stack developer with
        around 4 years of experience. I currently work at Allfunds where I apply
        my specialization in
        <span class="font-semibold text-yellow-400">JavaScript</span> and
        <span class="font-semibold text-blue-600">TypeScript</span>. In my free
        time, I enjoy exploring projects with Arduino and other
        microcontrollers.
      </p>

      <p class="mt-2">
        Previously, I played video games professionally and was recognized as
        one of the best players in Spain. Although my free time is more limited
        now, I still find moments to enjoy a few games.
      </p>

      <p class="mt-2">
        I am dedicated to developing web applications that are not only
        efficient and scalable, but also user-friendly. My interest in software
        architecture, infrastructure, and maintaining clean code drives my
        constant learning and improvement, both inside and outside of work.
      </p>

      <p class="mt-2">
        When I am not immersed in code or keeping up with the latest
        technological trends, you are likely to find me reading a good book or
        investigating new technologies, always driven by curiosity.
      </p>
    </section>
  `,
  styles: [],
})
export default class HomeComponent {}
