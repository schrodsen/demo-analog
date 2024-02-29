import { MetaTag } from '@analogjs/router';
import { Injectable, inject } from '@angular/core';
import { MetaFakerService } from './faker/meta-faker.service';
import { MetaTagModel } from './model/meta-tag.model';

@Injectable({
  providedIn: 'root'
})
export class MetadataRouteResolverService {

  static getMetaByUrl(url: string) : MetaTag[] {

    const resolverService = inject(MetadataRouteResolverService);
    return resolverService.getMeta(url);
  }

  apiService = inject(MetaFakerService);

  defaultRouteMeta: MetaTag[] = [
      {
        name: 'whatever',
        content: 'Description of the page',
      },
      {
        name: 'author',
        content: 'Mars Boys',
      },
      {
        property: 'og:title',
        content: 'Title of the page',
      },
      {
        property: 'og:description',
        content: 'Some catchy description',
      },
      {
        property: 'og:image',
        content: 'https://somepage.com/someimage.png',
      },
    ];

constructor() { }

    getMeta(url: string) : MetaTag[] {
      const metadata = this.apiService.getMeta(url);
      return this.generateMeta(metadata);
    }

    private generateMeta(metaTags: MetaTagModel[]) : MetaTag[] {

      const meta : MetaTag[] = [];
      for(let tag of metaTags) {

        if (tag.property !== null && tag.content !== null) {
          meta.push({
            property: tag.property as string,
            content: tag.content as string,
          });
          continue;
        }

        if (tag.name !== null && tag.content !== null) {
          meta.push({
            name: tag.name as string,
            content: tag.content as string,
          });
          continue;
        }

        if (tag.httpEquiv !== null && tag.content !== null) {
          meta.push({
            httpEquiv: tag.name as string,
            content: tag.content as string,
          });
          continue;
        }

        if (tag.charset !== null) {
          meta.push({
            charset: tag.charset as string,
          });
          continue;
        }
      }

      return meta;
    }
}


