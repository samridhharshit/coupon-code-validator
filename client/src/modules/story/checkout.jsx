import React, {useEffect, useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from 'axios'
import {connect} from "react-redux";

function Checkout(props) {
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [checklistItems, setChecklistItems] = useState([])
    const [total, setTotal] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [code, setCode] = useState('')
    const [discount, setDiscount] = useState(0)
    const [message, setMessage] = useState('')

    const { buttonLabel, className } = props;

    const toggle = () => setModal(!modal);

    useEffect(() => {
        async function getData() {
            const checkoutList = props.stories.filter(story => story.count !== undefined)
            let total = 0
            for (let i = 0; i < checkoutList.length; i++) {
                total += checkoutList[i].price * checkoutList[i].count
            }
            setTotal(total)

            const response = await axios.post('/api/coupon/verifyCoupon', {coupon: code, total})
            if (response.data.inRange === true) {
                setNetTotal(response.data.finalAmount)
                setDiscount(response.data.discount)
            } else {
                if (code !== '') {
                    setMessage(response.data.message)
                }
            }

            setChecklistItems([...checkoutList])
        }
        getData()
    }, [props.stories, code])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const { code_string, value, start_date, end_date, type, minAmount } = e.target.elements

        const object = {
            couponValue: value.value,
            start_date: start_date.value,
            end_date: end_date.value,
            type: type.value,
            minAmount: minAmount.value,
            code_string: code_string.value
        }
        axios.post('/api/coupon/addCoupon', object)

    }

    const handleCodeUpdate = async (e) => {
        setNetTotal(0)
        setDiscount(0)
        setTotal(0)

        e.preventDefault()
        setCode(e.target.value)

        const response = await axios.post('/api/coupon/verifyCoupon', {coupon: e.target.value, total})
        if (response.data.inRange === true) {
            setNetTotal(response.data.finalAmount)
            setDiscount(response.data.discount)
        }
    }

    return (
        <div className="checkout-container container col-6 align-content-center registration">
            <h3>Checkout</h3>
            {
                checklistItems.map(item =>
                <div key={item._id}>
                    <p><a>{item.name} &#215; {item.count}</a> <span className="price">&#8377;{item.price * item.count}</span></p>
                </div>
                )
            }
            <hr/>
            <div className="coupon-container">
                <label htmlFor="couponcode">Apply coupon:</label>
                <input
                    id="couponcode"
                    name="code"
                    type="text"
                    value={code}
                    onChange={handleCodeUpdate}
                    disabled={checklistItems.length === 0}
                />
            </div>
            <hr/>
            {
                message !== '' ?
                    <p>{message}</p> :
                    <p>No Coupon is used... </p>
            }
            <p>
                Total:
                <span
                    className="price"
                    style={{"color": "black"}}
                >
                    <b>&#8377;{total}</b>
                </span>
            </p>
            {
                discount !== 0 ?
                    <p>
                        Discount:
                        <span
                            className="price"
                            style={{"color": "black"}}
                        >
                            <b>&#8377;{discount}</b>
                        </span>
                    </p> : null
            }
            <p>
                Net Total:
                <span
                    className="price"
                    style={{"color": "black"}}
                >
                    <b>&#8377;{netTotal}</b>
                </span>
            </p>
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
                        <label htmlFor="value">Code Value</label>
                        <input
                            type="number"
                            id="value"
                            name="value"
                        />
                    </div><br/>
                        <div className="input-group">
                            <label htmlFor="codeValue">Your Code</label>
                            <input
                                type="text"
                                id="codeValue"
                                name="code_string"
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

const mapStateToProps = (state) => {
    return {
        stories: state.stories
    }
}



export default connect(mapStateToProps)(Checkout)