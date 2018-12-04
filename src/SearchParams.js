import React from "react";
import pf, { ANIMALS } from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class SearchParams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: []
    };
    // Two way data binding is not FREE in React.
    // This is how you do 2 data binding
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleAnimalChange = this.handleAnimalChange.bind(this);
    this.handleBreedChange = this.handleBreedChange.bind(this);
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
    const breedList = petfinder.breed.list;
    if (this.state.animal) {
      breedList({ animal: this.state.animal }).then(data => {
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
        <div className="search-params">
          <label htmlFor="location">
            location
            <input
              onChange={this.handleLocationChange}
              id="location"
              value={this.state.location}
              placeholder="Location"
            />
          </label>
          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={this.state.animal}
              onChange={this.handleAnimalChange}
              onBlur={this.handleAnimalChange}
            >
              <option />
              {ANIMALS.map(animal => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              id="breed"
              value={this.state.breed}
              onChange={this.handleBreedChange}
              onBlur={this.handleBreedChange}
              disabled={!this.state.breeds.length}
            >
              <option />
              {this.state.breeds.map(breed => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          <button>Submit</button>
        </div>
      </div>
    );
  }
}

export default SearchParams;
