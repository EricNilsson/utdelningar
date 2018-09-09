import React, { Component } from 'react';
import { connect } from 'react-redux';
import stockData from '../stocklist.json';

class Home extends Component {
  state = {
    stocks: stockData,
    result: stockData,
    input: '',
    portfolio: {},
  };
  componentDidMount() {
    this.timeout = 0;
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  addStock = (name, api_id) => {
    let stock = {
      name: name,
      api_id: api_id,
      quantity: '0',
      value: 0,
      dividends: {},
    };
    this.setState({ portfolio: [...this.state.portfolio, stock] });
  };

  editQuantity = event => {
    const name = event.target.name;
    const quantity = event.target.value;
    let portfolio = this.state.portfolio;
    const index = portfolio.findIndex(stock => stock.api_id === name);

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://www.avanza.se/_mobile/market/stock/${name}`
      )
        .then(response => response.json())
        .then(data => {
          portfolio[index].value = data.lastPrice * parseInt(quantity, 10);
          portfolio[index].dividends = data.dividends;
          portfolio[index].quantity = quantity;
          this.setState({ portfolio });
        })
        // Catch any errors we hit and update the app
        .catch(error => this.setState({ error, isLoading: false }));
    }, 700);
  };

  renderSum() {
    if (Object.keys(this.state.portfolio).length !== 0) {
      const sum = this.state.portfolio.map(item => item.value).reduce((prev, next) => prev + next);
      return sum;
    }
  }
  renderStock() {
    if (Object.keys(this.state.portfolio).length !== 0) {
      const stock = this.state.portfolio.map((item, i) => (
        <li key={i}>
          <input type="text" name={item.api_id} onChange={this.editQuantity} />
          {item.name}
        </li>
      ));

      return stock;
    }
  }

  renderStockList() {
    if (this.state.input.length > 0) {
      const stocks = this.state.result.map((item, i) => (
        <li onClick={() => this.addStock(item.name, item.api_id)} key={i}>
          {item.name}
        </li>
      ));

      return stocks;
    }
  }

  filterStocks = event => {
    this.setState({ input: event.target.value });
    let result = [];
    result = this.state.stocks.filter(stock => {
      return stock.name.toLowerCase().search(event.target.value) !== -1;
    });
    this.setState({ result });
  };

  render() {
    return (
      <div>
        <ul>{this.renderStock()}</ul>
        <div>{this.renderSum()}</div>
        <input type="text" placeholder="Search" onChange={this.filterStocks} />
        <ul className="list-group">{this.renderStockList()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stocks: state.stockReducer,
  };
}

export default connect(mapStateToProps)(Home);
