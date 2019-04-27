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
    ],
  }
  
  doFetch = () => {
    fetch("https://api.exchangeratesapi.io/latest")
    .then(response => response.json())
    .then(data => {
    
        //If baseCurrency is EUR, to get the bar chart to display properly:
        
    
        console.log("got data", data);
        this.setState({
            apiData: data,
        });
        
        
        let highest = 0;
        
        for (let currency of this.state.currencies) {
            let rate = data.rates[currency]   
            if (rate > highest) {
            highest = rate;
            }
        }
        
        data.rates.EUR = 1.00;
        
        let rates = [];
        for (let currency of this.state.currencies) {

            let item =  {
                    currency: currency,
                    height: data.rates[currency]/highest * 100,
                    rate: data.rates[currency],
                };
                  
            rates.push(item);
        }
        
        this.setState({
            rates: rates
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
                    style={{ height: rate.height + "%"}}>
                    {rate.currency} {rate.rate.toFixed(2)}
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
