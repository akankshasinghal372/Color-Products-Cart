import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import orderDetails from './components/orderDetails';

import OrderForm from './components/orderForm';
import Orders from './components/orders';

import OrderDetails from './components/orderDetails';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <OrderForm />
        </Route>
        <Route path="/Orders">
          <Orders />
        </Route>
        <Route path="/Order/:id">
          <OrderDetails />
        </Route>
      </Switch>
    </Router>
  )
}
export default App;