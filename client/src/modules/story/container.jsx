import React from "react";
import StoriesCollection from "./storiesCollection";
import Checkout from "./checkout";
import CouponList from "../coupon/couponList";

export default function Container() {
    return (
        <div className="main-container container-fluid col-sm-12">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <StoriesCollection />
                </div>
                <div className="vertical"/>
                <div className="container coupons-section col-md-6 col-sm-12">
                    <Checkout />
                    <CouponList />
                </div>
            </div>
        </div>
    )
}