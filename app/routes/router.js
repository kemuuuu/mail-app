const express = require('express');
const router = express.Router();

router.use('/', express.static('./dist'));
router.use('/template/list', express.static('./dist'));
router.use('/template/create', express.static('./dist'));
router.use('/template/edit/:id', express.static('./dist'));
router.use('/template/key-register/:id', express.static('./dist'));

module.exports = router;
