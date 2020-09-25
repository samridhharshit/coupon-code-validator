const express = require('express');
const router = express.Router();

const verifyCoupon = require('../../../controller/verifyCoupon')
const addCoupon = require('../../../controller/addCoupon')
const getAllCoupons = require('../../../controller/getAllCoupons')

router.post('/verifyCoupon', async  (req, res) => { res.send(await verifyCoupon(req.body)) })
router.post('/addCoupon', async (req, res) => { res.send(await addCoupon(req.body)) })
router.get('/getAllCoupons', async  (req, res) => { res.send(await getAllCoupons()) })
module.exports = router