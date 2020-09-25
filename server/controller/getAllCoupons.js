const coupon = require('../database/models/coupons')

const getAllCoupons = async () => {
    return await coupon.find({})
}

module.exports = getAllCoupons