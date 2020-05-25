import React, { useReducer, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { appReducer } from './reducer/AppReducer';

import './App.css';
import Navbar from './layout/Navbar';
import { products } from './products';
import Home from './layout/Home';
import Men from './layout/Men';
import Women from './layout/Women';
import Checkout from './layout/Checkout';
import WishList from 'layout/WishList';

const initalState = {
  products: products,
  currentProducts: [],
  hasBeenFiltered: false,
  showCart: false,
  size: { size: null, id: null },
  cart: [],
  filter: {
    search: '',
    price: 30,
    sizeSm: false,
    sizeMd: false,
    sizeLg: false,
    men: true,
    women: true,
  },
  checkout: 1,
  wishList: [],
};

export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(appReducer, initalState);
  
  return (
    <Router>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path={'/'} component={Home}></Route>
              <Route exact path={'/men'} component={Men}></Route>
              <Route exact path={'/women'} component={Women}></Route>
              <Route exact path={'/checkout'} component={Checkout}></Route>
              <Route exact path={'/wish-list'} component={WishList}></Route>
            </Switch>
          </div>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </Router>
  );
}

export default App;
