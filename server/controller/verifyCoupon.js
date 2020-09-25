const coupon = require('../database/models/coupons')

const verifyCoupon = async (body) => {
    const Coupon = await coupon.findOne({ code: body.coupon })
    if (Coupon) {
        if (new Date().getTime() > Coupon.startDate.getTime() && new Date().getTime() < Coupon.endDate.getTime()) {
            if (body.total >= Coupon.thresholdAmount) {
                let discount;
                if (Coupon.type === 'percentage') {
                    discount = (body.total * Coupon.value)/100
                } else {
                    discount = Coupon.value
                }

                return {
                    inRange: true,
                    discount,
                    finalAmount: body.total - discount
                }
            } else {
                return {
                    inRange: false,
                    message: `Need to add more items worth ${Coupon.thresholdAmount - body.total} to the list for this coupon to be enabled.`
                }
            }
        } else {
            return {
                inRange: false,
                message: 'Coupon expired! Try another coupon.'
            }
        }
    } else {
        return {
            inRange: false,
            message: 'Coupon invalid!please use a valid Coupon.'
        }
    }

}

module.exports = verifyCoupon