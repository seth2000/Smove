import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import CarLocation from './CarLocation'
import BookingAvailability from './BookingAvailability'

import Nav from './Nav'
function App() {
  return (
    <div className="App">

    <Nav />
   
    <Switch>
      <Route exact path='/' component={CarLocation}></Route>
      <Route exact path='/BookingAvailability' component={BookingAvailability}></Route>
    </Switch>

     
    </div>
  );
}

export default App;
