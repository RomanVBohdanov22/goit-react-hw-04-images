import PropTypes from 'prop-types';
import '../searchbar/Searchbar.css';
import { useState } from 'react';

const Searchbar = ({ onFormSubmit }) => {
  const [query, setQuery] = useState('');

  const onHandleChange = event => {
    const { value } = event.currentTarget;
    setQuery(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onFormSubmit({ query });
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
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
          onChange={onHandleChange}
          value={query}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
//Searchbar
//export const App = () =>
/*
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };
 */
/*
ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
*/
