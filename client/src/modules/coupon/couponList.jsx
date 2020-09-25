import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'

export  default function CouponList() {

    const [coupons, setCoupons] = useState([])


    useEffect(() => {
        async function getAllCoupons() {
            const response = await axios.get('/api/coupon/getAllCoupons')
            if (response.data) {
                await setCoupons([...response.data])
            }
        }
        getAllCoupons()
    }, [])

    return (
        <div className="container row row-cols-1 row-cols-md-1">
            <div className="checkout-container container col-6 align-content-center registration">
                <h4>Choose a promo code</h4>
                <p>
                    <b>discount</b>
                    <span className="price">coupon code</span>
                </p>
                <hr/>
                <div>
                    {
                        coupons.map((coupon) =>
                            <div key={coupon._id}>
                                <p>
                                    <Link to={'/'}>{coupon.type === 'flat' ? `Rs ${coupon.value}` : `${coupon.value}%`}</Link>
                                    <span className="price">{coupon.code}</span>
                                </p>
                                <hr/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}