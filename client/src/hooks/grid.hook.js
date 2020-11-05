import {useCallback} from "react";
import {useHttp} from "./http.hook";

export const useGrid = () => {
  const {request, loading, error} = useHttp();

  const getData = useCallback(async (
    url = '/api/test/',
    order = [],
    sort = {},
    filter = {},
    limit = 10,
    offset = 0
  ) => {
    try{
      return await request(url, 'GET');
    }catch(e){return e}

  }, [request]);

  return {getData, loading, error};
}
