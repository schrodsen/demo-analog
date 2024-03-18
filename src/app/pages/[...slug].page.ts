
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouteMeta, injectLoad } from '@analogjs/router';
import { MetadataRouteResolverService } from '../services/metadata-route-resolver.service';
import { RouteResolverService } from '../services/route-resolver.service';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { load } from './[...slug].server';
import { toSignal } from '@angular/core/rxjs-interop';
import { DynamicComponentModel } from '../services/model/dynamic-page.model';
import { DynamicPageComponent } from '../components/dynamic-page/dynamic-page.component';
import { PlatformService } from '../services/platform.service';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

export const routeMeta: RouteMeta = {
  meta: async (route, state) => {
    const platform = inject(PlatformService);

    if (platform.isServer) {
      const resolverService = inject(MetadataRouteResolverService);
      return await resolverService.getMetaByUrl(state.url);
    }
    return [];
  }
};

@Component({
  selector: 'app-cms-core',
  standalone: true,
  template: `
    <app-header></app-header>
    <app-dynamic-page [components]="this.components" />
    <app-footer></app-footer>
    <p>
      <a href="/about">About me</a>
    </p>
  `,
  styleUrl: '../css/index.page.css',
  imports: [
    CommonModule,
    DynamicPageComponent,
    HeaderComponent,
    FooterComponent,
  ]
})
export default class CmsCoreComponent {

  private readonly route = inject(Router);
  readonly slug = this.route.url;

  pageTitle = inject(Title);
  routeResolverService = inject(RouteResolverService);
  components : DynamicComponentModel[] = [];

  pageData = toSignal(injectLoad<typeof load>(), { requireSync: true });

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
