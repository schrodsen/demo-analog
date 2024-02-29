import { Injectable } from '@angular/core';
import { MetaTagModel } from '../model/meta-tag.model';

@Injectable({
  providedIn: 'root'
})
export class MetaFakerService {

  routeToMetaMap = new Map<string, MetaTagModel[]>([
    [
      "/about",
      [
        {
          charset: null,
          content: 'about Reisenaktuell',
          httpEquiv: null,
          id: null,
          itemprop: null,
          name: 'title',
          property: null,
          scheme: null,
          url: null,
        },
        {
          charset: null,
          content: 'Whatever',
          httpEquiv: null,
          id: null,
          itemprop: null,
          name: 'description',
          property: null,
          scheme: null,
          url: null,
        },
        {
          charset: null,
          content: 'Reisen, Eigenreisen, Flugreisen, günstig',
          httpEquiv: null,
          id: null,
          itemprop: null,
          name: 'keywords',
          property: null,
          scheme: null,
          url: null,
        },
        {
          charset: null,
          content: 'index, follow',
          httpEquiv: null,
          id: null,
          itemprop: null,
          name: 'robots',
          property: null,
          scheme: null,
          url: null,
        },
        {
          charset: null,
          content: 'max-image-preview:large, notranslate',
          httpEquiv: null,
          id: null,
          itemprop: null,
          name: 'googlebot',
          property: null,
          scheme: null,
          url: null,
        },
      ],
    ],
    [
      "base",
      [
        {
          charset: null,
          content: 'Mars Boys',
          httpEquiv: null,
          id: null,
          itemprop: null,
          name: 'author',
          property: null,
          scheme: null,
          url: null,
        },
      ]
    ]
  ]);

  constructor() { }

  getMeta(url: string) : MetaTagModel[] {

    const routeMeta = this.routeToMetaMap.get(url) ?? [];
    const baseMeta = this.routeToMetaMap.get('base') ?? [];

    return baseMeta.concat(routeMeta) ?? [];
  }
}
