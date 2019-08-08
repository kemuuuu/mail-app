const express = require('express');
const router = express.Router();
const template_apis = require('../api/v1/template_api');

router.post('/v1/template/create', template_apis.create);
router.get('/v1/template/findall', template_apis.findAll);
router.post('/v1/template/delete', template_apis.delete);

module.exports = router;
