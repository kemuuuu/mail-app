/**
 * POST
 * @param url post先
 * @param data postするデータ
 */
export const postData = function(url: string, data: any) {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data),
  })
  .then(response => response.json());
}

/**
 * GET
 * @param url get先
 */
export const getData = function(url: string) {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    redirect: "follow",
    referrer: "no-referrer",
  })
  .then(response => response.json());
}

/**
 * クエリを含めたURL生成
 * @param path 
 * @param params 
 */
export const generateGetUrlObj = function(host: string, path: string, params: any) {
  // Create URL_OBJECT
  const url = path;
  const url_obj = new URL(url, host);
  const url_params = new URLSearchParams();
  // Include template_id in query
  Object.keys(params).map((e) => {
    url_params.append(e, params[e])
  });
  url_obj.search = url_params.toString();
  return url_obj.toString();
}