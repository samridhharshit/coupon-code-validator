const express = require('express');
const router = express.Router();

const verifyCoupon = require('../../../controller/verifyCoupon')
const addCoupon = require('../../../controller/addCoupon')

router.post('/verifyCoupon', async  (req, res) => { res.send(await verifyCoupon(req.body)) })
router.post('/addCoupon', async (req, res) => { res.send(await addCoupon(req.body)) })

module.exports = router