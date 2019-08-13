const request = require('request-promise');

exports.getData = (url) => {
  const options = {
    url: url,
    method: 'GET',
    json: true
  }
  request(options)
  .then((result) => {console.log(result)})
  .catch((err) => {console.error(err)})
}