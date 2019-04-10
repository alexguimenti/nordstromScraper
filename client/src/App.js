import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {}
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() {
    const response = await fetch(
      "http://localhost:4000/nordstrom?top=10&keyword=red%20dresses"
    );
    const json = await response.json();
    console.log(json);
    this.setState({ json });
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

    return <div className="App">{products}</div>;
  }
}

export default App;
