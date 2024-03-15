import { PageServerLoad } from "@analogjs/router";
import { MarsPageModel } from "../services/model/mars-page.model";

export const load = async ({
  params, // params/queryParams from the request
  req, // H3 Request
  res, // H3 Response handler
  fetch, // internal fetch for direct API calls,
  event, // full request event
}: PageServerLoad) => {

  try {

    const route = `/${params ? params['slug'] : ''}`
    console.log('load page config', route);

    const apiUrl = `https://vhdev.proxy.beeceptor.com/page?route=${route}`;
    console.log(apiUrl);
    const response = await fetch<MarsPageModel>(apiUrl, { ignoreResponseError: true })
      .catch(() => {
        return undefined;
      });;

    //console.log('page configuration', '/', response);

    return response;
  }
  catch {
    return undefined;
  }
};
