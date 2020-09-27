import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import '../App.css';

export const OrderList = []
export const UgencyValues = [
    { id: 1, name: 'Urgent' },
    { id: 2, name: 'Non-Urgent' }
]
export const PRODUCTS = {
    Products_A: {
        statusNo: 1,
        label: 'ColorPaint',
        price: 35,
        variety: [{ id: 1, name: 'Red' }, { id: 2, name: 'Green' }, { id: 3, name: 'Blue' }]
    },
    Products_B: {
        statusNo: 2,
        label: 'PaintBrush',
        price: 10,
        variety: [{ id: 1, name: 'Small' }, { id: 2, name: 'Medium' }, { id: 3, name: 'Large' }]
    },

};

class OrderForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            urgency: 0,

            productList: []

        }
    }
    componentDidMount() {
        this.addProducts();
        this.getUnique()
    }
    addProducts = () => {
        const newObj = {
            product: 0,
            price: 0,
            variety: 0
        }
        this.setState({ productList: [...this.state.productList, newObj] })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    getUnique = () => {
        this.setState({
            id: new Date().valueOf()
        })

    }
    getSum = () => {
        let total = 0;

        this.state.productList.length > 0 && this.state.productList.map(e => total += e.price)
        return total;
    }
    submitOrder = () => {

        if (this.state.name == '' || this.state.urgency == 0 || this.state.productList.length == 0) {
            this.setState({ error: 'Please fill required Details' })
            return
        }
        const data = {
            id: this.state.id,
            name: this.state.name,
            urgency: this.state.urgency,
            products: this.state.productList,
            price: this.getSum()
        }


        var ordersList = localStorage.getItem('Order') ? JSON.parse(localStorage.getItem('Order')) : [];
        ordersList.push(data);
        localStorage.setItem('Order', JSON.stringify(ordersList))
        this.props.history.push("/Orders");
        this.setState({ error: '' })
    }
    render() {
        return (
            <div className='container'>

                <div className='row'>
                    <div className='col-12'>
                        {this.state.error && <div class="alert alert-warning" role="alert">
                            {this.state.error}
                        </div>
                        } <div className='OrderForm'>
                            <h5><strong>Order Form- </strong></h5>
                            <label> ID: {this.state.id}</label>
                            <br />
                            <label> Name :
                            <input type='text' name='name' value={this.state.name || ''} onChange={this.handleChange}></input>
                            </label>
                            <br />
                            <label> Urgency :
                                <select value={this.state.urgency} name="urgency"
                                    onChange={this.handleChange} >
                                    <option value="0">Select</option>
                                    {
                                        UgencyValues.map((e) => { return <option key={e.id} value={e.id}> {e.name} </option> })
                                    }
                                </select>
                            </label>
                            <br />
                            <br />
                            <button type='button' onClick={this.addProducts}> Add Product</button>
                            <br />

                            {this.state.productList.map(e => {
                                return <div style={{ marginTop: '10px' }}>
                                    <label> Product :
                                    <select
                                            value={e.product} name="product"

                                            onChange={event => {
                                                const Obj = Object.values(PRODUCTS).find(ev => ev.statusNo == event.target.value);

                                                e.product = event.target.value;
                                                e.variety = 0;
                                                e.varieties = Obj != undefined ? Obj.variety : [];
                                                e.price = Obj != undefined ? Obj.price : 0
                                                this.setState({ productList: this.state.productList, })
                                            }} >
                                            <option value="0">Select</option>
                                            {
                                                Object.values(PRODUCTS).map((e) => { return <option key={e.statusNo} value={e.statusNo}> {e.label} </option> })
                                            }
                                        </select>
                                    </label>
                                    {
                                        e.varieties && e.varieties.length > 0 &&
                                        <Fragment>
                                            <label style={{ margin: 10 }}> Variety :
                                            <select value={e.variety} name="variety"

                                                    onChange={event => {
                                                        e.variety = event.target.value;
                                                        this.setState({ productList: [...this.state.productList], })
                                                    }} >
                                                    <option value="0">Select</option>
                                                    {
                                                        e.varieties && e.varieties.map((e) => { return <option key={e.id} value={e.id}> {e.name} </option> })
                                                    }
                                                </select>
                                            </label>
                                            <label>Price:${e.price} </label></Fragment>
                                    }
                                    <br />
                                </div>
                            })}

                            <label>Sub Total:${this.getSum()}</label>
                            <br />
                            <button type='button' onClick={this.submitOrder}> Submit</button>
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

export default withRouter(OrderForm);