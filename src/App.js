import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import rootReducer from 'reducers/index';
import { initalState } from 'store/initalState';
import { Provider } from 'store/index';

import 'App.css';
import Navbar from 'layout/Navbar';
import Home from 'layout/Home';
import Checkout from 'layout/Checkout';
import WishList from 'layout/WishList';
import Cart from 'components/cart/Cart';

const setHideFilter = window.innerWidth > 600 ? false : true;

function App() {
  const [state, dispatch] = useReducer(rootReducer, initalState);
  
  return (
    <Router>
      <Provider value={{ state, dispatch }}>
        <div>
          <Navbar />
          <Cart />
          <Switch>
            <Route exact path={'/'} component={Home}></Route>
            <Route exact path={'/men'} render={() => { return <Home sexFitFilter="men" /> }}></Route>
            <Route exact path={'/women'} render={() => { return <Home sexFitFilter="women" /> }}></Route>
            <Route exact path={'/checkout'} component={Checkout}></Route>
            <Route exact path={'/wish-list'} component={WishList}></Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
