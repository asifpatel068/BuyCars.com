import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const handleSearch = () => {
    const [newMake, newModel] = searchQuery.split(' ');
    setMake(newMake);
    setModel(newModel);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for OEM Specs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Link
        to={`/oem-specs/${make}/${model}`}
        className="search-button"
        onClick={handleSearch}
      >
        Search
      </Link>
    </div>
  );
};

export default SearchBar;
