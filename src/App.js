import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import rootReducer from 'reducers/index';
import initialState from 'store/initialState';
import { Provider } from 'store/index';
import Navbar from 'layout/Navbar';
import Home from 'layout/Home';
import Men from 'layout/Men';
import Women from 'layout/Women';
import Checkout from 'layout/Checkout';
import WishList from 'layout/WishList';
import './App.css';

function App() { 
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <Router>
      <Provider value={{ state, dispatch }}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path={'/'} component={Home}></Route>
            <Route exact path={'/men'} component={Men}></Route>
            <Route exact path={'/women'} component={Women}></Route>
            <Route exact path={'/checkout'} component={Checkout}></Route>
            <Route exact path={'/wish-list'} component={WishList}></Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
