import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { PageFakerService } from '../services/faker/page-faker.service';
import { RouteMeta } from '@analogjs/router';
import { MetadataRouteResolverService } from '../services/metadata-route-resolver.service';
import { RouteResolverService } from '../services/route-resolver.service';


export const routeMeta: RouteMeta = {
  providers: [MetadataRouteResolverService],
  meta: (routeSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return MetadataRouteResolverService.getMetaByUrl(state.url);
  },
};

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  template: `
    <div>
      <img alt="Analog Logo" class="logo analog" src="/analog.svg" />
    </div>

    <h2>Analog</h2>

    <h3>The fullstack meta-framework for Angular!</h3>

    <p>
      <a routerLink="/about">About me</a>
    </p>

    <div class="dynamic-container">
      @for (item of subComponents; track item) {
            <ng-container *ngComponentOutlet="
              item.component" />
        }
    </div>
  `,
  styleUrl: '../css/index.page.css',
  imports: [
    CommonModule,
    RouterLink
  ]
})
export default class DynamicPageComponent {

  router = inject(Router);
  routeResolverService = inject(RouteResolverService);
  fakePageService = inject(PageFakerService);

  subComponents: any[] = [];

  constructor() {
    console.log('ctor', this.router.url);
    const pageConfiguration = this.routeResolverService.getPageConfigurationByUrl(this.router.url)
    this.subComponents = pageConfiguration;
    console.log(this.subComponents);
    //this.subComponents = this.fakePageService.getComponents();
  }
}
