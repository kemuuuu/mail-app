const express = require('express');
const router = express.Router();
const template_apis = require('../api/v1/template_api');
const template_key_apis = require('../api/v1/template_key_api');

// TEMPLATE
router.get('/v1/template/findall', template_apis.findAll);
router.get('/v1/template/findone', template_apis.findone);
router.get('/v1/template/findkeys', template_apis.findKeys);
router.post('/v1/template/create', template_apis.create);
router.post('/v1/template/edit', template_apis.edit);
router.post('/v1/template/delete', template_apis.delete);

// TEMPLATE-KEY
router.post('/v1/template-key/regist', template_key_apis.bulkUpsert);

module.exports = router;
