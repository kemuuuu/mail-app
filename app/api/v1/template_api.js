const repositry = require('../../repositries/template-repositry')
const repo = new repositry();

/**
 * template全取得
 */
exports.findAll = (req, res, next) => {

  repo
    .findAll()
    .then((templates) => {
      res.json({ templates: templates });
    })
    .catch(err => {
      console.error(err);
    });
}

/**
 * template作成API
 */
exports.create = (req, res, next) => {
  console.log('START CREATE TEMPLATE::');

  const name = req.body.templateName;
  const address = req.body.templateAddress;

  // create a template 
  repo
    .create(name, address)
    .then((template) => {
      console.log('COMPLETE CRETE TEMPLATE::');
      console.log(template);
      res.json({result: template})
    })
    .catch(err => {
      console.error(err);
    });
}

/**
 * Template 削除
 */
exports.delete = (req, res, next) => {
  // delete template
  repo.delete(req.body.id)
    .then(result => {
      console.log(result)
      res.json({result: result})
    })
    .catch(err => {
      console.log(err)
      res.json({result: err})
    })
}