import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { MarsPageModel } from './model/mars-page.model';
import { DynamicPageModel } from './model/dynamic-page.model';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService {

  constructor() { }

  mapPageConfigurationToDynamicPageModel(pageModel: MarsPageModel) : Observable<DynamicPageModel> {

    return from(new Promise<DynamicPageModel>(async (resolve) => {

      const dynamicPageModel: DynamicPageModel = {
        title: '',
        components: [],
      }

      dynamicPageModel.title = pageModel.title;

      for (let component of pageModel?.components) {
        const componentType = await this.mapNameToComponent(component.componentName);
        if (componentType === undefined)
          continue;

        dynamicPageModel.components.push({
          componentType: componentType
        });
      }
      resolve(dynamicPageModel);
    }))
  }

  private async mapNameToComponent(name: string) : Promise<any> {

    // const componentImport = await import(`../../components/${name}/${name}.component.ts`);
    // if (name === 'header') {
    //   //console.log('import', componentImport);
    //   return componentImport['HeaderComponent'];
    // } else if (name === 'footer') {
    //   //console.log('import', componentImport);
    //   return componentImport['FooterComponent'];
    // }

    switch (name) {
      case 'header':
        let headerImport = await import('../components/header/header.component');
        return headerImport.HeaderComponent;
      case 'footer':
        const footer = await import('../components/footer/footer.component');
        return footer.FooterComponent;
      case 'first':
        const firstImport = await import('../components/first/first.component');
        return firstImport.FirstComponent;
      case 'second':
        const second = await import('../components/second/second.component');
        return second.SecondComponent;
      case 'third':
        const third = await import('../components/third/third.component');
        return third.ThirdComponent;
      case 'image-slider':
        const imageSlider = await import('../components/image-slider/image-slider.component');
        return imageSlider.ImageSliderComponent;
      default:
       return undefined;
    }
  }
}
