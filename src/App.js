import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Items from './components/Items';
import Login from './components/Login';

const App = ({authService}) => (
  <div className="app">
    <header>
      오늘 할일
    </header>
    <div className="home">
      <BrowserRouter>
        <Switch>
          <route exact path={'/'}>
            <div className="login">
              <Login authService={authService}/>
            </div>
          </route>
          <Route path={'/items'}>
            <div className="items">
              <Items authService={authService}/>              
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    <footer>
      토고팩토리
    </footer>
  </div>
);

export default App;