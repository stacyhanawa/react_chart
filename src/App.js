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
    currencies: [
        "EUR",
        "USD",
        "AUD",
        "GBP",
        "BRL",
    ],
    rates: [
        {
            currency: "EUR",
            height: 83.4,
        },
        {
            currency: "USD",
            height: 83.4,
        },
        {
            currency: "AUD",
            height: 83.4,
        },
        {
            currency: "GBP",
            height: 83.4,
        },
        {
            currency: "BRL",
            height: 83.4,
        },
    ],
  }
  
  doFetch = () => {
    fetch("https://api.exchangeratesapi.io/latest")
    .then(response => response.json())
    .then(data => {
    
        /*If baseCurrency is EUR, to get the bar chart to display properly:
        if (baseCurrency ==="EUR") {
            this.setState({
                rates: '1.00',
            });
        }*/
    
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
                    <select className="CurrencyChooser-select" onChange={() => this.doFetch()}>
                         {
                            this.state.currencies.map(currency => (
                                <option value="{currency}">{currency}</option>
                            ))
                        }
                    </select>
                </label>
            </div>
        </section>
        <section className="MainContainer">
            <div className="CurrencyCheckboxList">
            </div>
            <div className="BarChart">
              {
                this.state.rates.map(rate => (
                  <div 
                    className="BarChart-bar" 
                    style={{ height: "{rate.height}%" }}>
                    {rate.currency}
                  </div>
                ))
              }
              

            </div>
        </section>
        
      </div>      
    );
  }
}

export default App;
