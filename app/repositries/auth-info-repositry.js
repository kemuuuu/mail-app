const db = require('../models/index');
const authInfo = db.auth_info;

class AuthInfoRepositry {


  /**
   * IDからAuthInfo取得
   * @param {string} id 
   */
  findOne(id) {
    return new Promise((resolve, reject) => {
      authInfo.findOne({ where: {id: id}})
      .then(authInfo => resolve(authInfo))
      .catch(err => console.error(err));
    })
  }

  /**
   * TYPEからAuthInfo取得
   * @param {string} type
   */
  findOneByType(type) {
    return new Promise((resolve, reject) => {
      authInfo.findOne({ where: {type: type}})
      .then(authInfo => resolve(authInfo))
      .catch(err => console.error(err));
    })
  }

  /**
   * AuthInfo 作成
   * @param {*} params
  */
  create(params) {
    return new Promise((resolve, reject) => {
      authInfo.create(params)
      .then(authInfo => resolve(authInfo))
      .catch(err => console.error(err));
    })
  }

  /**
   * AuthInfo 更新
   * @param {*} params 更新する情報 
   * @param {string} id 更新するレコードid
   */
  update(params, id) {
    return new Promise((resolve, reject) => {
      authInfo.update(params, { where: { id: id } })
      .then(authInfo => resolve(authInfo))
      .catch(err => console.error(err))
    })
  }

  /**
   * authInfo 削除
   * @param {string} id 
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      authInfo.destroy({ where: {id: id} })
      .then(result => {resolve(result)})
      .catch(err => {console.error(err)});
    })
  }

}

module.exports = AuthInfoRepositry
