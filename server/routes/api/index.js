const express = require('express');
const router = express.Router();

router.use('/items', require('./items'))
router.use('/coupon', require('./coupons'))

module.exports = router