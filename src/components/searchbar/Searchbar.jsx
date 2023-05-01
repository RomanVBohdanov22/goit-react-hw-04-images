import PropTypes from 'prop-types';
import '../searchbar/Searchbar.css';
import { Component } from 'react';

class Searchbar extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };
  state = {
    query: '',
  };

  onHandleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value.trim() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    this.props.onFormSubmit({ query });
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onHandleChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
