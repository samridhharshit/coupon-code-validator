const coupon = require('../database/models/coupons')

const addCoupon = async (body) => {
    const newCoupon = new coupon({
        startDate: body.start_date,
        endDate: body.end_date,
        thresholdAmount: body.minAmount,
        type: body.type,
        value: body.couponValue,
        code: body.code_string
    })

    return newCoupon.save()
}

module.exports = addCoupon