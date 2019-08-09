const db = require('../models/index');
const template_key = db.template_key;

class TemplateKeyRepositry {

  /**
   * テンプレートKey一括Upsert
   * @param {*} params
   */
  bulkUpsert(params, fields, upsertfields) {
    return new Promise((resolve, reject) => {
      template_key.bulkCreate(params, {
        fields: fields,
        updateOnDuplicate: upsertfields
      })
      .then(template => resolve(template))
      .catch(err => console.error(err));
    })
  }
}

module.exports = TemplateKeyRepositry