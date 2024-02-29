import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { MetadataRouteResolverService } from './../services/metadata-route-resolver.service';

export const routeMeta: RouteMeta = {
  providers: [MetadataRouteResolverService],
  meta: (routeSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return MetadataRouteResolverService.getMetaByUrl(state.url);
    },
};

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <h2>About me</h2>

    <p>
      <a routerLink="/">Home</a>
    </p>
  `,
  styleUrl: '../css/about.page.css',
  imports: [
    RouterLink
  ]
})
export default class AboutComponent {



  constructor() {

  }
}
