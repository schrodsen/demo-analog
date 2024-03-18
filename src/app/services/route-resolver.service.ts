import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { MarsPageModel } from './model/mars-page.model';
import { DynamicPageModel } from './model/dynamic-page.model';
import { FooterComponent } from '../components/footer/footer.component';
import { FirstComponent } from '../components/first/first.component';
import { HeaderComponent } from '../components/header/header.component';
import { ImageSliderComponent } from '../components/image-slider/image-slider.component';
import { SecondComponent } from '../components/second/second.component';
import { ThirdComponent } from '../components/third/third.component';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService {

  constructor() { }

  buildPageModel(pageModel: MarsPageModel) : DynamicPageModel {

    const dynamicPageModel: DynamicPageModel = {
      title: '',
      components: [],
    }

    dynamicPageModel.title = pageModel.title;

    for (let component of pageModel?.components) {
      const componentType = this.loadComponentStatic(component.componentName);
      if (componentType === undefined)
        continue;

      dynamicPageModel.components.push({
        componentType: componentType,
        inputs: { guid: component.componentId }
      });
    }

    return dynamicPageModel;
  }

  private loadComponentStatic(name: string) : any {
    switch (name) {
      case 'header':
        return HeaderComponent;
      case 'footer':
        return FooterComponent;
      case 'first':
        return FirstComponent;
      case 'second':
        return SecondComponent;
      case 'third':
        return ThirdComponent;
      case 'image-slider':
        return ImageSliderComponent;
      default:
       return undefined;
    }
  }

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
          componentType: componentType,
          inputs: { guid: component.componentId }
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
