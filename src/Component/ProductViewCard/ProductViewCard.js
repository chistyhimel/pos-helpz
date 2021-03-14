import React, { useContext, useEffect, useState } from 'react';
import './ProductViewCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../../App';
import axios from 'axios';

const ProductViewCard = ({ productData }) => {

    const { value1, value2 } = useContext(UserContext);
    const [productInfo, setProductInfo] = value1;
    const [loggedInUser, setLoggedInUser] = value2;


    const useStyles = makeStyles({
        root: {
            maxWidth: 160,
        },
        media: {
            height: 70,
        },
    });
    const classes = useStyles();

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
            item.paymentMethod = '';
            item.transactionId = '';
            item.totalPrice = item.price;

            item.totalQuantity = item.quantity;
            setProductInfo(newItem);
        }
    }



    return (
        <div className="productViewCardBody">
            {
                <Card onClick={() => handleCount(productInfo, setProductInfo, productData)} className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={"https://mudee.shop/helpz/assets/images/products/" + productData.photo}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h6">
                                {productData.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <small>Price:</small> <strong>{productData.price} Tk. </strong> <br />
                                <small>Stock:</small><strong>{productData.stock}</strong><br />
                            </Typography>
                        </CardContent>
                    </CardActionArea>

                </Card>
            }
        </div>
    );
};

export default ProductViewCard;