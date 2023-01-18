import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const DetailEditUser = () => {
    const { id } = useParams()
    const [orderData, setOrderData] = useState({})
    
    useEffect(()=> {
        if (JSON.stringify(orderData) === '{}') {
            axios.get(`/api/orders/${id}`, {headers: {authorization: window.localStorage.getItem("token")}})
                .then((response) => {
                    console.log(response.data)
                    setOrderData(response.data)
                })
        }
    }, [orderData])


    return <div>
       {JSON.stringify(orderData) === '{}' ? <p>Loading</p> :
       <div className="order-details-container" style={{padding: "50px"}}>
            <p>Order ID: {orderData.id}</p>
            <p>Order Total: ${orderData.total}</p>
            <p>Order Paid: {String(orderData.orderPaid)}</p>
            <p>User's email: {orderData.user.email}</p>
            {orderData && orderData.orderItems && orderData.orderItems.length ?
            orderData.orderItems.map((item, index) => {
                return <div key={index} style={{backgroundColor: "lightblue", marginTop: "10px", display: "flex"}}>
                    <div style={{flex: "1", paddingTop: "5px", paddingLeft: "30px"}}>
                        <p>{item.product.name}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>Price ${item.product.price}</p>
                    </div>
                    <div style={{flex: "1", borderRadius: "20px"}}>
                        <img src={item.product.image} style={{height: "120px", padding: "5px"}}/>
                    </div>
                </div>
            })
        : <></>}
       </div>
        
       }
    </div>
}

export default DetailEditUser; 