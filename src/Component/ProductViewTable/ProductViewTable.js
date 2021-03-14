import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./ProductViewTable.css";
import axios from "axios";
import ProductViewCard from "../ProductViewCard/ProductViewCard";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { UserContext } from "../../App";
import { Box, Button } from "@material-ui/core";

const ProductViewTable = () => {
  const { value1, value2 } = useContext(UserContext);
  const [productInfo, setProductInfo] = value1;
  const [loggedInUser, setLoggedInUser] = value2;
  const { register, handleSubmit } = useForm();
  const [dataChange, setDataChange] = useState(null);
  let [search, setSearch] = useState([]);
  // console.log(search);
  let [initialProduct, setInitialProduct] = useState([]);
  let [customerInfo, setCustomerInfo] = useState([]);
  let [customerName, setCustomerName] = useState([]);
  console.log(customerName);

  const onSubmit = (data) => {};

  useEffect(() => {
    let data = {
      warehouse_id: 1,
    };
    if (data) {
      axios
        .post(`https://mudee.shop/helpz/api/product/initial/pos`, data)
        .then((res) => {
          // console.log(res);
          setInitialProduct(res.data);
          // console.log(res.data);
        });
    }
  }, []);
  useEffect(() => {
    let data = {
      name: dataChange,
      warehouse_id: 1,
    };
    // console.log(data);
    if (data.name) {
      axios
        .post(`https://mudee.shop/helpz/api/product/search/pos`, data)
        .then((res) => {
          // console.log(res);
          setSearch(res.data);
          // console.log(res.data);
        });
    }
  }, [dataChange]);

  useEffect(() => {
    axios.get(`https://mudee.shop/helpz/api/customer/list/pos`).then((res) => {
      // console.log(res);
      setCustomerName(res.data);
      //  console.log(res.data);
    });
  }, [customerInfo]);

  const handleChange = (e) => {
    setDataChange(e.target.value);
    // e.preventDefault();
  };
  const handleCustomer = (e) => {
    setCustomerInfo(e.target.value);
    // e.preventDefault();
  };
  const handleCount = (productInfo, setProductInfo, item) => {
    let productCart = productInfo.find((p) => p.id === item.id);
    // console.log(productCart);
    if (!productCart) {
      let newItem = [...productInfo, item];
      item.price = parseInt(item.price);
      item.quantity = 1;
      item.discount = 0;
      item.payable = 0;
      item.grandTotal = 0;
      item.paymentMethod = "";
      item.transactionId = "";
      item.totalPrice = item.price;

      item.totalQuantity = item.quantity;
      setProductInfo(newItem);
    }
  };
  const useStyles = makeStyles({
    root: {
      maxWidth: 160,
    },
    media: {
      height: 70,
    },
  });
  const classes = useStyles();

  const handleLogout = () => {
    setLoggedInUser({});
    localStorage.removeItem("user");
  };

  return (
    <div className="ProductViewTableBody">
      <Box textAlign="right">
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>

      <div className="inputHeader">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            onKeyUp={handleChange}
            name="name"
            ref={register}
            placeholder="Product Name"
          />
          <input
            onKeyUp={handleCustomer}
            name="customerName"
            ref={register}
            placeholder="Customer Name"
          />
          <span id="customerName"> </span>
        </form>
      </div>
      <div className="Products">
        <label>
          <strong>All Products:</strong>
        </label>
        <div className="allProducts">
          {search.length == 0
            ? initialProduct.map((item) => (
                <Card
                  onClick={() => handleCount(productInfo, setProductInfo, item)}
                  className={classes.root}
                >
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={
                        "https://mudee.shop/helpz/assets/images/products/" +
                        item.photo
                      }
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h6">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <small>Price:</small> <strong>{item.price} Tk. </strong>{" "}
                        <br />
                        <small>Stock:</small>
                        <strong>{item.stock}</strong>
                        <br />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            : search.map((d) => (
                //    <h1>{d.name}</h1>
                <ProductViewCard productData={d}> </ProductViewCard>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductViewTable;
