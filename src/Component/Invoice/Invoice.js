import React, { useContext, useRef } from 'react';
import './Invoice.css'
import { useReactToPrint } from 'react-to-print';
import { UserContext } from '../../App';


const Invoice = () => {
    const { value1, value2 } = useContext(UserContext);
    const [productInfo, setProductInfo] = value1;
    console.log(productInfo);


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const date = new Date().toString();


    return (
        <div ref={componentRef}>
            <div className="invoiceCompanyInfo">
                <h4>Company Information</h4>
                <strong> Name :<small>Hemel</small></strong>
                <strong> Email : <small>admin12@gmail.com</small> </strong>
                <strong> Phone : <small>01764323582</small> </strong>
                <strong> Shop Name :<small>Hemel</small></strong>
                <strong> Warehouse Name :<small>Ajowa</small></strong>
                <strong> Purchase Order(P.O) :<small>opru1615197316</small></strong>
                <strong> Barcode : <small>opru1615197316</small></strong>
            </div>
            <table className="invoiceTable" >
                <thead className="invoiceTableHead">
                    <tr>
                        <th>Item</th>
                        <th>Unit Price</th>
                        <th>Qty/Amt</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody className="invoiceTableBody">
                    {
                        productInfo.length ? productInfo.map((pd) =>
                            <tr>
                                <td>{pd.name}</td>
                                <td>{pd.price}</td>
                                <td>{pd.totalQuantity}</td>
                                <td>{pd.totalPrice}</td>
                            </tr>
                        ) : "No items added"
                        
                    }
                </tbody>
            </table>
            <div className="invoiceBottom">
                <div className="invoiceAmountSummary">
                    <div className="invoiceAmountBottom">
                        <strong>Sub-total:</strong>
                        <span>{productInfo.length && productInfo.reduce((a, b) => a + parseInt(b.totalPrice), 0)}Tk.</span>
                    </div>
                    <div className="invoiceAmountBottom">
                        <strong>Discount:</strong>
                        <span>{productInfo[0].discount} Tk.</span>
                    </div>
                    <div className="invoiceAmountBottom">
                        <strong>VAT:</strong>
                        <span>{ productInfo[0].transactionId}00 Tk.</span>
                    </div>
                    <div className="invoiceAmountBottom">
                        <strong>Grand total:</strong>
                        <span> {productInfo[0].grandTotal}
                            Tk.</span>
                    </div>
                    <div className="invoiceAmountBottom">
                        <strong>Payment On:</strong>
                        <span>{productInfo[0].paymentMethod}</span>
                    </div>
                    <div className="invoiceAmountBottom">
                        <small>{date}</small>

                    </div>
                </div>
                <div className="printBtn">
                    <button onClick={handlePrint}>Print this out</button>
                </div>
            </div>



        </div>
    );
};

export default Invoice;