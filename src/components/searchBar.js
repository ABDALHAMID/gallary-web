import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <input
        className="form-control w-50"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-primary ml-2" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
