const request = require('request-promise');
const { URL, URLSearchParams } = require('url');

exports.getData = (uri, headers) => {
  const options = {
    uri: uri,
    method: 'GET',
    headers: headers,
    json: true
  }
  return new Promise((resolve, reject) => {
    request(options)
    .then((result) => {resolve(result)})
    .catch((err) => {console.error(err)});
  });
}

exports.generateGetUrlObj = (host, path, params) => {
  // Create URL_OBJECT
  const url_obj = new URL(host+path);
  const url_params = new URLSearchParams(params);
  url_obj.search = url_params.toString();
  return url_obj.toString();
}