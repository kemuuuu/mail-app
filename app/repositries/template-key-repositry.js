const db = require('../models/index');
const template_key = db.template_key;

class TemplateKeyRepositry {

  /**
   * テンプレートKey作成
   * @param {*} params
   */
  create(params) {
    return new Promise((resolve, reject) => {
      template_key.create(params)
      .then(template => resolve(template))
      .catch(err => console.error(err));
    })
  }
}

module.exports = TemplateKeyRepositry