import React from 'react';

import st from './search.module.scss';

const Search = ({search, setSearch}) => {

  return (
    <input
      type="search"
      name="search"
      placeholder="Search..."
      className={st.search}
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
};

export default Search;