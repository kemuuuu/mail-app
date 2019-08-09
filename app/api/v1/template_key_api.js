const repositry = require('../../repositries/template-key-repositry');
const repo = new repositry();


/**
 * Template key 作成 API
 */
exports.create = (req, res, next) => {
  const params = {};
  params.template_id = req.body.templateId;
  params.key = req.body.keyName;

  // create a template-key
  repo
    .create(params)
    .then((template) => {
      console.log('COMPLETE CRETE TEMPLATE::');
      console.log(template);
      res.json({result: template})
    })
    .catch(err => {
      console.error(err);
    });
}