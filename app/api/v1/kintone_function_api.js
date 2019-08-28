const repositry = require('../../repositries/kintone-function-repositry');
const repo = new repositry();

exports.create = (req, res, next) => {

  // ファンクション作成用パラメータ
  const funcparams = {
    name: req.body.name,
    template_id: req.body.selectedTemplateId,
    kintone_appId: req.body.selectedAppId,
    kintone_spaceId: req.body.selectedAppSpaceId
  };

  // Kintone_field作成用パラメータ
  const fieldParams = req.body.kintoneFields;

  repo
  .create({funcparams, fieldParams})
  .then((kintoneFunction) => {
    res.json({result: kintoneFunction});
  })
  .catch(err => {
    console.error(err);
  });
}