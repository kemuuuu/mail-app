const db = require('../models/index');
const template = db.template;

class TemplateRepositry {

  /**
   * 全Template 取得
   */
  findAll() {
    return new Promise((resolve, reject) => {
      template.findAll()
      .then(templates => resolve(templates))
      .catch(err => console.error(err));
    })
  }

  /**
   * Template 作成
   * @param {string} name テンプレート名
   * @param {string} address 送信元アドレス
  */
  create(name, address) {
    return new Promise((resolve, reject) => {
      template.create({
        name: name,
        address: address
      })
      .then(template => resolve(template))
      .catch(err => console.error(err));
    })
  }

  /**
   * Template 削除
   * @param {string} id 
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      template.destroy({ where: {id: id} })
      .then(result => {resolve(result)})
      .catch(err => {console.error(err)});
    })
  }

}

module.exports = TemplateRepositry
