import React, { useEffect, useState } from 'react'
import "./Orders.css"
import axios from 'axios'
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

export default function Orders({ url }) {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + '/api/order/list');
    if (response.data.success) {
      setOrders(response.data.data)
    } else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    // console.log(event,orderId)
    const response = await axios.post(url + '/api/order/status', {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])


  return (
    <div className='order add'>
      <h3>Orders Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div kry={index} className="order-item">
              <img src={assets.parcel_icon} alt="parcel-icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity
                    } else {

                      return item.name + " x " + item.quantity + ", "
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p >{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ', ' + order.address.zipcode}</p>
                </div>
                <div className="order-item-phone">
                  {order.address.phone}
                </div>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}.00</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}
