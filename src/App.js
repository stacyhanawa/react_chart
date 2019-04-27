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
    selectedCurrency: "EUR",
    highest: 0,
  }
  

  handleChange = (event) => {
    console.log(event.target.value);
    this.state.selectedCurrency = event.target.value;
    this.doFetch();
  }
  
  doFetch = () => {
    fetch("https://api.exchangeratesapi.io/latest?base=" + this.state.selectedCurrency)
    .then(response => response.json())
    .then(data => {    

        this.setState({
            apiData: data,
        });
        
        
        this.state.highest = 0;
        for (let currency of this.state.currencies) {
            let rate = data.rates[currency]   
            if (rate > this.state.highest) {
            this.state.highest = rate;
            }
        }
        
        if (this.state.selectedCurrency === "EUR") {
            data.rates.EUR = 1.00;
        }
        
        
        let rates = [];
        for (let currency of this.state.currencies) {

            let height = data.rates[currency]/this.state.highest * 100;
            let item =  {
                    currency: currency,
                    height: height,
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
                    <select className="CurrencyChooser-select"  onChange={this.handleChange}>
                         {
                            this.state.currencies.map(currency => (
                                <option value={currency}>{currency}</option>
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
