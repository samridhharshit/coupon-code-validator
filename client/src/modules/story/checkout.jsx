import React, {useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from 'axios'

export default function Checkout(props) {
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);
    // const [codeValue, setCodeValue] = useState("")
    // const [minAmount, setMinAmount] = useState(0)

    const { buttonLabel, className } = props;

    const toggle = () => setModal(!modal);

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const { value, start_date, end_date, type, minAmount } = e.target.elements
        console.log(value.value, start_date.value, end_date.value, type.value, minAmount.value)
        const object = {
            couponValue: value.value,
            start_date: start_date.value,
            end_date: end_date.value,
            type: type.value,
            minAmount: minAmount.value
        }
        axios.post('/api/coupon/addCoupon', object)
            .then(res => {
                console.log(res)
            })

    }

    const handleCheckout = async (e) => {
        e.preventDefault()
        console.log('handle it')
    }

    return (
        <div className="checkout-container container col-6 align-content-center registration">
            <h3>Checkout</h3>
            {/*<p><a>Product 1</a> <span className="price">$15</span></p>*/}
            {/*<p><a>Product 2</a> <span className="price">$5</span></p>*/}
            {/*<p><a>Product 3</a> <span className="price">$8</span></p>*/}
            {/*<p><a>Product 4</a> <span className="price">$2</span></p>*/}
            <hr/>
            <div className="coupon-container">
                <label htmlFor="couponcode">Apply coupon:</label>
                <input id="couponcode" type="text"/>
            </div>
            <hr/>
            <p>Total <span className="price" style={{"color": "black"}}><b>$0</b></span></p>
            <br />
            <p>Want to create your own coupon?
                <button
                    onClick={toggle}
                    className="modal-button"
                >
                    Click here...
                </button>
            </p>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Add coupon</ModalHeader>
                <form onSubmit={handleFormSubmit} className="form">
                <ModalBody>
                        <div className="input-group">
                            <label htmlFor="codeValue">Your Code</label>
                            <input
                                type="text"
                                id="codeValue"
                                name="value"
                            />
                        </div><br/>
                        <div className="input-group">
                            <label htmlFor="start-date">Start Date</label>
                            <input type="date" id="start-date" name="start_date"/>
                        </div><br/>
                        <div className="input-group">
                            <label htmlFor="end-date">End Date</label>
                            <input type="date" id="end-date" name="end_date"/>
                        </div><br/>
                        <div className="input-group">
                            <label htmlFor="thresholdAmount">Threshold Amount</label>
                            <input
                                type="number"
                                id="thresholdAmount"
                                name="minAmount"
                            />
                        </div><br/>
                        <div className="input-group">
                            <label htmlFor="type">Type</label>
                            <select className="select" name="type" id="type">
                                <option value="percentage">Percentage</option>
                                <option value="flat">Flat</option>
                            </select>
                        </div><br/>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" outline={true} onClick={toggle}>Cancel</Button>
                    <Button type="submit" color="success" outline={true} onClick={toggle}>Add Coupon...</Button>{' '}
                </ModalFooter>
            </form>
            </Modal>
        </div>
    )
}