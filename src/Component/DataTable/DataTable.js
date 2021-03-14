import React, { useContext } from 'react';
import { UserContext } from '../../App';
import './DataTable.css'
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";



const DataTable = () => {
    const { value1, value2 } = useContext(UserContext);
    const [productInfo, setProductInfo] = value1;
    // console.log(productInfo);


    const handleQuantityIncrement = (productInfo, setProductInfo, id) => {
        if (productInfo.find((product) => product.id === id)) {
            const product = productInfo.find((product) => product.id === id);
            product.totalQuantity = product.totalQuantity + 1;
            product.totalPrice = product.price * product.totalQuantity;

            if (productInfo.find((item) => item.id === product.id)) {
                var objectIndex = productInfo.findIndex((obj) => obj.id === product.id);
                var newItems = [...productInfo];
                newItems[objectIndex] = product;
                setProductInfo(newItems);
            }
        }
    };
    const handleQuantityDecrement = (productInfo, setProductInfo, id) => {
        if (productInfo.find((item) => item.id === id)) {
            const product = productInfo.find((product) => product.id === id);
            if (product.totalQuantity > 1) {
                product.totalQuantity = product.totalQuantity - 1;
                product.totalPrice = product.price * product.totalQuantity;
                var objectIndex = productInfo.findIndex((obj) => obj.id === product.id);
                var newItems = [...productInfo];
                newItems[objectIndex] = product;
                setProductInfo(newItems);
            }
        }
    };

    return (
        <div className="tb">
            <table className="table" id="item">
                <thead>
                    <tr>
                        <th className="ItemName">Item</th>
                        <th>Price</th>
                        <th>Qty/Amt</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productInfo.length ? productInfo.map((p) =>
                            <tr>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td className="quantity"> <AiOutlineMinusSquare onClick={() => handleQuantityDecrement(productInfo, setProductInfo, p.id)} />
                                    <input className="quantityInput" id="quantityInput" type="text" value={p.totalQuantity} />
                                    <AiOutlinePlusSquare onClick={() => handleQuantityIncrement(productInfo, setProductInfo, p.id)} />
                                </td>
                                <td>{p.totalPrice}</td>
                            </tr>
                        ) : "No items added"
                    }
                </tbody>

            </table>
        </div>
    );
};

export default DataTable;