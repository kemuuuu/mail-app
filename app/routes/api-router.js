const express = require('express');
const router = express.Router();
const template_apis = require('../api/v1/template_api');
const template_key_apis = require('../api/v1/template_key_api');
const kintone_function_apis = require('../api/v1/kintone_function_api');
const auth_info_apis = require('../api/v1/auth_info_api');
const connect_salesforce = require('../src/salesforce/connect');
const kintone_apis = require('../api/v1/kintone_api');

// template
router.get('/v1/template/findall', template_apis.findAll);
router.get('/v1/template/findone', template_apis.findone);
router.get('/v1/template/findkeys', template_apis.findKeys);
router.post('/v1/template/create', template_apis.create);
router.post('/v1/template/edit', template_apis.edit);
router.post('/v1/template/delete', template_apis.delete);
// template-key
router.post('/v1/template-key/regist', template_key_apis.bulkUpsert);
// kintone-function
router.post('/v1/kintone-function/create', kintone_function_apis.create);
// salesforce
router.post('/v1/salesforce/connect', connect_salesforce.exec);
// auth-kintone
router.get('/v1/kintone/auth/find', auth_info_apis.findone);
router.post('/v1/kintone/auth/create', auth_info_apis.create__kintone);
// kintone
router.get('/v1/kintone/getapps', kintone_apis.getapps);
router.get('/v1/kintone/getfields', kintone_apis.getfields);

module.exports = router;
