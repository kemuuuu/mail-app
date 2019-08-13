const repositry = require('../../repositries/auth-info-repositry');
const repo = new repositry();

/**
 * AuthInfo Typeから取得
 */
exports.findone = (req, res, next) => {

  const type = req.query.type;

  repo
    .findOneByType(type)
    .then((authInfo) => {
      res.json({ result: authInfo });
    })
    .catch(err => {
      console.error(err)
    })
}

/**
 * AuthInfo作成__kintone
 */
exports.create__kintone = (req, res, next) => {
  // TOKEN生成
  const buf = Buffer.from(req.body.loginName+':'+req.body.password);
  const tkn = buf.toString('base64');
  // Base_url指定
  const base_url =  `https://${req.body.domain}.cybozu.com`;

  const params = {};
  params.type = req.body.type;
  params.token = tkn;
  params.refresh_token = tkn;
  params.base_url = base_url;

   // create an auth info
   repo
    .create(params)
    .then((authInfo) => {
      res.json({result: authInfo})
    })
    .catch(err => {
      console.error(err);
    });
}

