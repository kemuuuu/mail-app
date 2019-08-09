const repositry = require('../../repositries/template-repositry')
const repo = new repositry();

/**
 * template全取得
 */
exports.findAll = (req, res, next) => {

  repo
    .findAll()
    .then((templates) => {
      res.json({ result: templates });
    })
    .catch(err => {
      console.error(err);
    });
}

/**
 * template1件取得
 */
exports.findone = (req, res, next) => {

  const id = req.query.id;

  repo
    .findOne(id)
    .then((template) => {
      res.json({ result: template });
    })
    .catch(err => {
      console.error(err)
    })
}

/**
 * template作成API
 */
exports.create = (req, res, next) => {
  console.log('START CREATE TEMPLATE::');
  const params = {};
  params.name = req.body.templateName;
  params.address = req.body.templateAddress;

  // create a template 
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

/**
 * Template 編集
 */
exports.edit = (req, res, next) => {

  const id = req.body.templateId;
  const params = {};
  params.name = req.body.templateName;
  params.address = req.body.templateAddress;

  repo.update(params, id)
    .then(template => {
      res.json({result: template})
    })
    .catch(err => {
      res.json({result: err})
    })
}

/**
 * Template 削除
 */
exports.delete = (req, res, next) => {
  // delete template
  repo.delete(req.body.id)
    .then(result => {
      res.json({result: result})
    })
    .catch(err => {
      console.error(err)
      res.json({result: err})
    })
}