import React, { useContext, useEffect, useState } from 'react';
import './CartBottom.css'
import { MdCancel, MdLocalGroceryStore } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';



const CartBottom = () => {
    const { value1, value2 } = useContext(UserContext);
    const [productInfo, setProductInfo] = value1;

    const [payable, setPayable] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [tnxId, setTnxId] = useState('');
    // console.log(discount);
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        let newData = [...productInfo];
        if (data) {
            newData.map(p => p.paymentMethod = data.paymentMethod);
            data.paymentMethod == 'bkash' || data.paymentMethod == 'cash + bkash' ? document.getElementById('tnxIdBody').style.display = 'block' : document.getElementById('tnxIdBody').style.display = 'none';
        }
        else {
            newData.map(p => p.paymentMethod = 'Cash');

            data.paymentMethod == 'bkash' || data.paymentMethod == 'cash + bkash' ? document.getElementById('tnxIdBody').style.display = 'block' : document.getElementById('tnxIdBody').style.display = 'none';
        }
    };

    useEffect(() => {
        let newData = [...productInfo];
        newData.map(p => p.discount = discount)
        // console.log(newDiscount);
    }, [discount])

    useEffect(() => {
        let newData = [...productInfo];
        newData.map(p => p.transactionId = tnxId)

    }, [tnxId])

    const handleDiscount = (e) => {
        setDiscount(e.target.value);
        let grandTotal = document.getElementById('grandTotal').innerHTML;
        let newGrandTotal = grandTotal - e.target.value;
        console.log(newGrandTotal);
        let newData = [...productInfo];
        newData.map(p => p.grandTotal = newGrandTotal)
        setPayable(newGrandTotal);
    }

    const handleLogOut = (e) => {
        localStorage.removeItem("userInfo");
        e.reset();
    }

    const handleTnxID = (e) => {
        setTnxId(e.target.value);
    }
    const handleCancel = () => {
        setProductInfo([]);
    }
    const handlePayment = () => {
        console.log("payment");
    }
    return (
        <section>
            <div className="cartBottom">
                <div className="cartBottomUpper">
                    <div className="leftItems">
                        {/* <div className="sub sec">
                            <div className="Item">
                                <label>Item(Tk.) :</label>
                            </div>
                            <div className="amount">
                                {
                                    productInfo.length ? productInfo[productInfo.length - 1].price : null
                                }
                            </div>
                        </div> */}
                        <div className="sub sec">
                            <div className="tax">
                                <label>Tax: </label>
                            </div>

                            <div className="amount">
                                00
                            </div>
                        </div>
                        <div className="sub sec" >
                            <div className="title">
                                <label>Discount:</label>
                            </div>
                            <div className="optionDiscount">
                                <form onChange={handleSubmit(onSubmit)} className="">
                                    <select ref={register} name="discountMethod" className="" >
                                        <option value="1">%</option>
                                        <option value="2">Tk.</option>
                                    </select>
                                </form>
                            </div>
                            <div className="amount">
                                <input id="discount" onChange={handleDiscount} name="discount" type="text" placeholder="Amt" />
                            </div>
                        </div>
                    </div>
                    <div className="TotalPayment">
                        <div className="sub sec">
                            <div className="title">
                                <label>Grand total</label>
                            </div>
                            <div className="amount" id="grandTotal">
                                {productInfo.length && productInfo.reduce((a, b) => a + parseInt(b.totalPrice), 0)}
                            </div>
                        </div>
                        <div id="tnxIdBody">
                            <div className="sub sec" >
                                <div className="title">
                                    <label>Tnx. ID</label>
                                </div>
                                <div className="amount" id="grandTotal">
                                    <input id="tnxID" onChange={handleTnxID} type="text" name="tnxID" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="totalPayable">

                    <div className="title">
                        <label>Total Payable</label>
                    </div>
                    <div className="amount">
                        Tk. {
                            productInfo.length && productInfo.reduce((a, b) => a + parseInt(b.totalPrice), 0) - parseInt(discount)
                        }
                    </div>

                </div>
                <div className="paymentButton">
                    <div className="left">
                        <div className="up">
                            {/* <button ><FaHandPaper />
                                Suspend
                            </button> */}
                            <form onChange={handleSubmit(onSubmit)} className="paymentButtonLower Suspend">
                                <select ref={register} name="paymentMethod" className="paymentMethod">
                                    <option value="cash">Cash</option>
                                    <option value="bkash">Bkash</option>
                                    <option value="cash + bkash">Cash & Bkash</option>
                                </select>
                            </form>
                            <button className="paymentButtonLower Order">
                                Log Out
                            </button>
                        </div>
                        <div className="low">
                            <button onClick={handleCancel} className="paymentButtonLower Cancel">  <MdCancel /> Cancel</button>
                            <button style={{ decoration: 'none' }} className="paymentButtonLower Bill"> <RiSecurePaymentLine /> <Link to="/invoice">Bill </Link> </button>
                        </div>
                    </div>

                    <div className="right">
                        <button onClick={handlePayment} className="paymentButtonLower Payment"> <RiSecurePaymentLine /> Payment</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartBottom;