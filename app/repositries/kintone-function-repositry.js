const db = require('../models/index');
const kintoneFunction = db.kintone_function;
const kintoneField = db.kintone_field;

class kintoneFunctionRepositry {

  /**
   * kintoneFunction 作成
   * @param {*} params
  */
  create(funcparams, fieldparams) {
    return new Promise((resolve, reject) => {
      // KintoneFunction作成
      kintoneFunction.create(funcparams)
      .then((kintoneFunction) => {
        fieldparams.map(e => {
          e.kintone_function_id = kintoneFunction.id
        });

        // KintoneField作成
        kintoneField.bulkCreate(fieldparams)
        .then((kintoneFields) => {
          console.log(kintoneFields);
          resolve(kintoneFunction);
        });

      });
    });
  }

}

module.exports = kintoneFunctionRepositry
