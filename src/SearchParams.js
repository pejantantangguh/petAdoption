import React from 'react';


class SearchParams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "Seattle, WA",
            animal : "",
            breed : ""
        };
        // Two way data binding is not FREE in React. 
        // This is how you do 2 data binding
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    handleLocationChange() {
        this.setState({
            location: event.target.value
        });
    };
  
    
        render() {
            return (
                <div>
                    <div className='search-params'>
                        <label htmlFor="location">
                            location 
                            <input 
                                onChange={this.handleLocationChange}
                                id="location"
                                value={this.state.location}
                                placeholder= "Location"
                            />
                        </label>
                    </div>
                </div>
            );
        }
    }


export default SearchParams;