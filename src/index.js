import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './views/home.js';
import Sample1 from './views/sample1.js';
import Sample2 from './views/sample2.js';
import DashBoardFun from './views/dashboard-fun.js';
import ItemList from './views/item-list.js';
import { addInitListener } from '@luigi-project/client';
import ObjectForm, { } from './views/ObjectForm.js'
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    addInitListener(() => {
      console.log('Luigi Client initialized.');
    });
  }
  render() {
    return (
      <BrowserRouter basename={`sampleapp.html#`}>
        <Route path="/home" component={Home} />
        <Route path="/sample1" component={Sample1} />
        <Route path="/sample2" component={Sample2} />
        <Route path="/dashboard" component={DashBoardFun} />
        <Route path="/item-list" component={ItemList} />
        <Route path="/object-form" component={ObjectForm} />
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('root'));
