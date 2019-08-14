const repositry = require('../../repositries/template-key-repositry');
const repo = new repositry();

/**
 * Template key 作成 API
 */
exports.bulkUpsert = (req, res, next) => {
  // Input values
  const keys = req.body.keys;
  const params = Object.keys(keys).map((e) => {return keys[e]});

  // target fields
  const fields = ["id", "template_id", "key", "a_row_below", "sort_number", "createdAt", "updatedAt"];
  // upsert key
  const upsertfields = ["key", "a_row_below", "sort_number", "createdAt", "updatedAt"];

  // create a template-key
  repo
    .bulkUpsert(params, fields, upsertfields)
    .then((template) => {
      res.json({result: template})
    })
    .catch(err => {
      console.error(err);
    });
}