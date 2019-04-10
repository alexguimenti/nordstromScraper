import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      amount: 3,
      searchTerm: "red dress"
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  componentDidMount() {
    this.fetchProducts(this.state.amount, this.state.searchTerm);
  }

  async fetchProducts(amount, searchTerm) {
    const response = await fetch(
      `http://localhost:4000/nordstrom?top=${amount}&keyword=${searchTerm}`
    );
    const json = await response.json();
    console.log(json);
    this.setState({ json });
  }

  handleSubmit(event) {
    //Query the API with our params
    event.preventDefault();
    this.fetchProducts(this.state.amount, this.state.searchTerm);
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    let products = null;
    if (this.state.json.Products) {
      products = this.state.json.Products.map(product => {
        const imgUrl =
          "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom" +
          product.Media[0].Path;

        return (
          <div key={product.SkuId}>
            <div key={product.SkuId}>{product.Name}</div>
            <img src={imgUrl} alt="dress" width="300" />
          </div>
        );
      });
    }

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>Amount</label>
          <input
            type="number"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearchTermChange}
          />
          <input type="submit" value="Submit" />
        </form>

        {products}
      </div>
    );
  }
}

export default App;
