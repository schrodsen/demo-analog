import { Type } from "@angular/core";

export interface DynamicPageModel {
  title: string,
  components: DynamicComponentModel[],
}

export interface DynamicComponentModel {
  componentType: Type<any>,
  guid?: string,
  inputs?: Record<string, unknown>,

}
