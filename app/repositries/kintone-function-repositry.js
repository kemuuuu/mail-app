const db = require('../models/index');
const kintoneFunction = db.kintone_function;
const templateKey = db.template_key;

class kintoneFunctionRepositry {

  /**
   * kintoneFunction 作成
   * @param {*} params
  */
  create(params) {
    return new Promise((resolve, reject) => {
      Promise.all([
        kintoneFunction.create(),
        templateKey.findOne()
      ])
      .then((results) => {
        const func = results[0];
        const key = results[1];
        return func.setTemplate_keys(key);
      })
      .then((func) => {
        resolve(func);
      });
    });
  }

}

module.exports = kintoneFunctionRepositry
