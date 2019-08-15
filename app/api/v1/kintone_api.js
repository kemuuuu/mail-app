const authRepositry = require('../../repositries/auth-info-repositry');
const repo = new authRepositry();
const fetchUtils = require('../../src/utils/fetch-utils');
const AUTH_TYPES = require('../../config/enums').AUTH_TYPES;

/**
 * アプリ一覧を取得
 */
exports.getapps = (req, res, next) => {
  findKintoneAuth()
  .then((result) => {
    const path = '/k/v1/apps.json';
    const url = result.base_url + path;
    const header = {
      "X-Cybozu-Authorization": result.token
    }
    fetchUtils.getData(url, header)
    .then((result) => {
      res.json({result: result});
    })
  })
}

/**
 * 対象アプリの項目一覧を取得
 */
exports.getfields = (req, res, next) => {
  findKintoneAuth()
  .then((result) => {
    const appId = req.query.appId;
    const spaceId = req.query.spaceId;
    // Create URL_OBJECT
    const params = { app: appId };
    const path = `/k/guest/${spaceId}/v1/preview/app/form/fields.json`;
    const host = result.base_url;
    const url = fetchUtils.generateGetUrlObj(host, path, params);
    const header = {
      "X-Cybozu-Authorization": result.token
    };
    fetchUtils.getData(url, header)
    .then((fields) => {
      res.json({result: fields});
    });
  })
}

/**
 * KINTONEの認証情報を取得する
 */
function findKintoneAuth() {
  return new Promise((resolve, reject) => {
    repo.findOneByType(AUTH_TYPES.KINTONE)
    .then((result) => {resolve(result)})
    .catch((err) => {console.error(err)})
  });
}