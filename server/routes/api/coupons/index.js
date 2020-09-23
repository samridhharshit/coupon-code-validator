const express = require('express');
const router = express.Router();

const verifyCoupon = require('../../../controller/verifyCoupon')

router.post('/verifyCoupon', async  (req, res) => { res.send(await verifyCoupon(req.body)) })

module.exports = router