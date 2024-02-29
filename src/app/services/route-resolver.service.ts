import { Injectable, inject, signal } from '@angular/core';
import { MarsPageModel } from './model/mars-page.model';
import { PageFakerService } from './faker/page-faker.service';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService {

  private pageFakerService = inject(PageFakerService);

  private _currentRoute = signal<string>('');
  currentRoute = this._currentRoute.asReadonly;

  constructor() { }

  setRoute(route: string) : void {
    this._currentRoute.set(route);
  }

  getPageConfigurationByUrl(url: string) :any {
    return this.pageFakerService.getConfigurationByUrl(url);
  }
}
