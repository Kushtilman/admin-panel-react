import React from 'react';
import st from './search.module.scss';
import PropTypes from 'prop-types';

const Search = ({searchTerm, handleSearch}) => {
  return (
    <input
      type="search"
      name="search"
      placeholder="Search..."
      className={st.search}
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string,
  handleSearch: PropTypes.func,
};

export default Search;
