import React from "react";
import {Link} from "react-router-dom";

export  default function CouponList() {
    return (
        <div className="container row row-cols-1 row-cols-md-1">
            <div className="checkout-container container col-6 align-content-center registration">
                <h4>Choose a promo code</h4><hr/>
                <div>
                    <p><Link to={'/'}>Product 1</Link> <span className="price">asdsdsa</span></p><hr/>
                    <p><Link to={'/'}>Product 2</Link> <span className="price">sadjkhds</span></p>
                </div>
            </div>
        </div>
    )
}