import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { injectLoad } from '@analogjs/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { load } from './index.server';
import { DynamicPageComponent } from '../components/dynamic-page/dynamic-page.component';
import { DynamicComponentModel } from '../services/model/dynamic-page.model';
import { RouteResolverService } from '../services/route-resolver.service';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MarsPageModel } from '../services/model/mars-page.model';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-header></app-header>
    <app-dynamic-page [components]="this.components" />
    <app-footer></app-footer>
  `,
  styleUrl: '../css/index.page.css',
  imports: [
    DynamicPageComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export default class HomeComponent implements OnInit {

  private readonly route = inject(Router);
  readonly slug = this.route.url;

  private httpClient = inject(HttpClient);
  pageTitle = inject(Title);
  routeResolverService = inject(RouteResolverService);

  pageData = toSignal(injectLoad<typeof load>(), { requireSync: true });
  components : DynamicComponentModel[] = [];

  constructor() {

    const pageData = this.pageData();

    if (pageData !== undefined) {
      const pageModel = this.routeResolverService.buildPageModel(pageData);
      this.pageTitle.setTitle(pageModel.title);
      this.components = pageModel.components;

      // this.routeResolverService.mapPageConfigurationToDynamicPageModel(pageData)
      //     .pipe(
      //       map(pageModel => {
      //         this.pageTitle.setTitle(pageModel.title);
      //         this.components = pageModel.components;
      //         return pageModel.components;
      //       })
      //     )
      //     .subscribe()
    }
  }

  ngOnInit() {
  //   const apiUrl = `https://vhdev.proxy.beeceptor.com/vercel/page?route=/`;
  //   const tmp = this.httpClient.get<MarsPageModel>(apiUrl)
  //     .pipe(
  //       tap((x) => console.log('ng on init', x))
  //     )
  //     .subscribe();
  }
}
