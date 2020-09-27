import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, UgencyValues } from './orderForm'
class Orders extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {
        var Orders = localStorage.getItem('Order');

        this.setState({ orders: Orders ? JSON.parse(Orders) : [] })
    }


    render() {
        return (
            <div className='container'>

                <div className='row'>
                    <div className='col-12'>
                        <div className='OrderForm'>
                            {this.state.orders && this.state.orders.map((e, i) => {
                                return <div key={i} className='OrderForm'>
                                    <h6>Order {i + 1}:</h6>
                                    <Link to={'Order/' + e.id}>  <span> Id :  {e.id}</span><br /></Link>
                                    <span> Name : {e.name} </span><br />
                                    <span> Urgency : {UgencyValues.find(el => el.id == e.urgency) != undefined ? UgencyValues.find(el => el.id == e.urgency).name : ''} </span><br />
                                    <span> Total Products Ordered:{e.products.length}  </span><br />
                                    <span> TotalPrice:${e.price}</span>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Orders;