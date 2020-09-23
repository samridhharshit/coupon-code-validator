const coupon = require('../database/models/coupons')

const verifyCoupon = async (body) => {
    const Coupon = await coupon.findOne({ value: body?.coupon })
    if (Coupon) {
        if (new Date().getTime() > Coupon.startDate.getTime() && new Date().getTime() < Coupon.endDate.getTime()) {
            let discount;
            if (Coupon.type === 'percentage') {
                discount = (body.total * Coupon.value)/100
            } else {
                discount = Coupon.value
            }

            const data  = {
                inRange: true,
                discount,
                finalAmount: body.total - discount
            }
            return data

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