const express = require('express');
const router = express.Router();

// template settings
router.use('/', express.static('./dist'));
router.use('/template/list', express.static('./dist'));
router.use('/template/create', express.static('./dist'));
router.use('/template/edit/:id', express.static('./dist'));
router.use('/template/key-register/:id', express.static('./dist'));
// service link settings
router.use('/service/select', express.static('./dist'));
router.use('/service/salesforce', express.static('./dist'));
router.use('/service/kintone', express.static('./dist'));
router.use('/service/kintone/func/create', express.static('./dist'));

module.exports = router;
