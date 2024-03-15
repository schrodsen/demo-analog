import { RouteMeta } from '@analogjs/router';
import { Component, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { MetadataRouteResolverService } from './../services/metadata-route-resolver.service';
import { PlatformService } from '../services/platform.service';

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
  selector: 'app-about',
  standalone: true,
  template: `
    <h2>About me</h2>

    <p>
      <a routerLink="/"> To Home</a>
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
