import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_Secret
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Seattle,WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange.bind(this),
      handleBreedChange: this.handleBreedChange.bind(this),
      handleLocationChange: this.handleLocationChange.bind(this),
      getBreeds: this.getBreeds
    };

    // this.handleLocationChange = this.handleLocationChange.bind(this);
    // this.handleAnimalChange = this.handleAnimalChange.bind(this);
    // this.handleBreedChange = this.handleBreedChange.bind(this);
    // this.getBreeds = this.getBreeds.bind(this);
  }

  handleLocationChange() {
    this.setState({
      location: event.target.value
    });
  }

  handleAnimalChange() {
    this.setState(
      {
        animal: event.target.value,
        breed: ""
      },
      this.getBreeds
    );
  }

  handleBreedChange() {
    this.setState({
      breed: event.target.value
    });
  }

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        } else {
          this.setState({
            breeds: []
          });
        }
      });
    } else {
      this.setState({
        breeds: []
      });
    }
  }
  render() {
    return (
      <div>
        <Link to="/">
          <header>Adopt Me!</header>
        </Link>
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
