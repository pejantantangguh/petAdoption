import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";

class App extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <header>Adopt Me!</header>
        </Link>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
          <SearchParams path="search-params"/>
        </Router>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));