import { Injectable, Type } from '@angular/core';
import { FirstComponent } from '../../components/first/first.component';
import { SecondComponent } from '../../components/second/second.component';
import { ThirdComponent } from '../../components/third/third.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MarsPageModel } from '../model/mars-page.model';


@Injectable({ providedIn: 'root' })
export class PageFakerService {

  // caller -> redirect undefined to 'not found'
  getConfigurationByUrl(url: string) :{
    component: Type<any>,
     inputs: Record<string, unknown>
    }[] | undefined {

    const pageConfiguration = this.routeToConfigurationMap.get(url);
    console.log('get config in faker', pageConfiguration)
    if (pageConfiguration === undefined) {
      return undefined;
    }

    const pageComponents: any[] = [];

    for (let component of pageConfiguration?.components) {
      const componentType = this.mapNameToComponent(component.componentName);
      pageComponents.push({
        component: componentType
      });
    }

    return pageComponents;
  }

  private mapNameToComponent(name: string) : any {
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
      default :
       return undefined;
    }
  }

  getComponents() {
    return [
      {
        component: FirstComponent,
      },
      {
        component: SecondComponent,
      },
      {
        component: FooterComponent,
      },
    ] as {
      component: Type<any>,
       inputs: Record<string, unknown>
      }[];
  }

  routeToConfigurationMap = new Map<string, MarsPageModel>([
    [
      "/home",
      {
        components: [
          {
            componentId: 'my-guid',
            componentName: 'header'
          },
          {
            componentId: 'my-guid',
            componentName: 'first'
          },
          {
            componentId: 'my-guid',
            componentName: 'second'
          },
          {
            componentId: 'my-guid',
            componentName: 'third'
          },
          {
            componentId: 'my-guid',
            componentName: 'footer'
          },
        ]
      }
    ],
    [
      "/about",
      {
        components: [
          {
            componentId: 'my-guid',
            componentName: 'header'
          },
          {
            componentId: 'my-guid',
            componentName: 'first'
          },
          {
            componentId: 'my-guid',
            componentName: 'footer'
          },
        ]
      }
    ],
    [
      "/test",
      {
        components: [
          {
            componentId: 'my-guid',
            componentName: 'header'
          },
          {
            componentId: 'my-guid',
            componentName: 'footer'
          },
        ]
      }
    ],
    [
      "/tuff/tuff",
      {
        components: [
          {
            componentId: 'my-guid',
            componentName: 'first'
          },
          {
            componentId: 'my-guid',
            componentName: 'second'
          },
          {
            componentId: 'my-guid',
            componentName: 'third'
          },
        ]
      }
    ],
  ]);
}
