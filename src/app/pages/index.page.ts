import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { injectLoad } from '@analogjs/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { load } from './index.server';
import { DynamicPageComponent } from '../components/dynamic-page/dynamic-page.component';
import { DynamicComponentModel } from '../services/model/dynamic-page.model';
import { RouteResolverService } from '../services/route-resolver.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-dynamic-page [components]="this.components" />

    <a href="/about">To About</a>
  `,
  styleUrl: '../css/index.page.css',
  imports: [
    DynamicPageComponent,
  ],
})
export default class HomeComponent {

  private readonly route = inject(Router);
  readonly slug = this.route.url;

  pageTitle = inject(Title);
  routeResolverService = inject(RouteResolverService);

  pageData = toSignal(injectLoad<typeof load>(), { requireSync: true });
  components : DynamicComponentModel[] = [];

  constructor() {

    const pageData = this.pageData();

    if (pageData !== undefined) {
      this.routeResolverService.mapPageConfigurationToDynamicPageModel(pageData)
          .pipe(
            map(pageModel => {
              console.log(pageModel);
              this.pageTitle.setTitle(pageModel.title);
              this.components = pageModel.components;
              return pageModel.components;
            })
          )
          .subscribe()
    }
  }
}
