const express = require('express');
const router = express.Router();

router.use('/', express.static('./dist'));
router.use('/template/list', express.static('./dist'));
router.use('/template/create', express.static('./dist'));

module.exports = router;
