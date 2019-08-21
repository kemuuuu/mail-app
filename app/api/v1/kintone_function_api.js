const repositry = require('../../repositries/kintone-function-repositry');
const repo = new repositry();

exports.create = (req, res, next) => {
  repo
  .create({})
  .then((kintoneFunction) => {
    res.json({result: kintoneFunction});
  })
  .catch(err => {
    console.error(err);
  });
}