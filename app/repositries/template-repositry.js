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
   * IDからtemplate取得
   * @param {string} id 
   */
  findOne(id) {
    return new Promise((resolve, reject) => {
      template.findOne({ where: {id: id}})
      .then(template => resolve(template))
      .catch(err => console.error(err));
    })
  }

  /**
   * Template 作成
   * @param {name: string, address: string} params
  */
  create(params) {
    return new Promise((resolve, reject) => {
      template.create(params)
      .then(template => resolve(template))
      .catch(err => console.error(err));
    })
  }

  /**
   * template 更新
   * @param {any} params 更新する情報 
   * @param {string} id 更新するレコードid
   */
  update(params, id) {
    return new Promise((resolve, reject) => {
      template.update(params, { where: { id: id } })
      .then(template => resolve(template))
      .catch(err => console.error(err))
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
