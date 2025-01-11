import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="d-flex justify-content-center mt-4">

        <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search images..."
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}  
        />
        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
