import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import Listing  from './componenets/Listing/Listing';
//import Edit from './componenets/Edit';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Listing} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
