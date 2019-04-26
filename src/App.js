/*
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
*/

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    apiData: '',
  }
  
  doFetch = () => {
    fetch("https://api.exchangeratesapi.io/latest")
    .then(response => response.json())
    .then(data => {
        console.log("got data", data);
        this.setState({
            apiData: data,
        });
    });
  }
  
  componentDidMount() {
    this.doFetch();
  }
  
  render() {
    return (
      <div className="App">
                
        <section className="TitleBar">
            <h1>Currency</h1>
            
            <div className="CurrencyChooser">
                <label>Base currency:
                    <select className="CurrencyChooser-select" onchange="doFetch()">
                        <option value="EUR" selected="selected">EUR</option>
                        <option value="USD">USD</option>
                        <option value="AUD">AUD</option>
                        <option value="GBP">GBP</option>
                        <option value="BRL">BRL</option>
                    </select>
                </label>
            </div>
        </section>
        <section className="MainContainer">
            <div className="CurrencyCheckboxList">
            </div>
            <div className="BarChart">
              <div 
                className="BarChart-bar" 
                style={{ height: "88.5%" }}>
                EUR €
              </div>
              <div 
                className="BarChart-bar" 
                style={{ height: "75.5%" }}>
                USD $
              </div>
              <div 
                className="BarChart-bar" 
                style={{ height: "55.9%" }}>
                AUD $
              </div>
              <div 
                className="BarChart-bar" 
                style={{ height: "99.8%" }}>
                GBP £
              </div>
              <div 
                className="BarChart-bar" 
                style={{ height: "19.4%" }}>
                BRL R$
              </div>
            </div>
        </section>
        
      </div>      
    );
  }
}

export default App;
