import { PageServerLoad } from "@analogjs/router";
import { MarsPageModel } from "../services/model/mars-page.model";
import { ImageSliderModel } from "../components/image-slider/image-slider.model";
import { from } from "rxjs";

export const load = async ({
  params, // params/queryParams from the request
  req, // H3 Request
  res, // H3 Response handler
  fetch, // internal fetch for direct API calls,
  event, // full request event
}: PageServerLoad) => {

  try {
    console.log('load page config', '/');

    const apiUrl = `https://vhdev.proxy.beeceptor.com/page?route=/`;
    const pageModel = await fetch<MarsPageModel>(apiUrl, { ignoreResponseError: true })
      .catch(() => {
        return undefined;
      });

    if (pageModel !== undefined) {

      for (let component of pageModel.components) {
        if (component.componentName !== 'image-slider') {
          continue;
        }

        const apiUrlSlider = `https://vhdev.proxy.beeceptor.com/slider/${component.componentId}`;
        const sliderModel = await fetch<ImageSliderModel>(apiUrlSlider, { ignoreResponseError: true })
          .catch(() => {
            return undefined;
          });

        console.log('slider model', sliderModel)
        component.data = sliderModel;
      }
    }

    return pageModel;
  }
  catch {
    return undefined;
  }
};

// example

// await ofetch("/api", {
//   async onResponseError({ request, response, options }) {
//     // Log error
//     console.log(
//       "[fetch response error]",
//       request,
//       response.status,
//       response.body
//     );
//   },
//});
