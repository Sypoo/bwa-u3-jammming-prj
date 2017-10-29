import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };

    this.search = this.search.bind(this);

    this.handleTermChange = this.handleTermChange.bind(this);

    this.enterSearch = this.enterSearch.bind(this);

  }

  enterSearch(event) {
    if (event.keyCode == 13) {
      event.preventDefault;
      this.props.onSearch(this.state.term);
    }
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    this.setState({
      term: e.target.value
    });
  }


  render() {
    return ( <
      div className = "SearchBar" >
      <
      input placeholder = "Enter A Song, Album, or Artist"
      onChange = {
        this.handleTermChange
      }
      onKeyUp = {
        this.enterSearch
      }
      /> <
      a onClick = {
        this.search
      } > SEARCH < /a> <
      /div>
    );
  }
}

export default SearchBar;
