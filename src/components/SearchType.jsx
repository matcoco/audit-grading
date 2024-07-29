import React from 'react';

const SearchType = ({ searchQuery, handleSearch, filteredResults, handleAddElement, handleBarcodeScan, searchInputRef }) => {
  return (
    <div className="search-type">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleBarcodeScan} // Utilisez onKeyDown ici
        placeholder="Rechercher..."
        ref={searchInputRef} // Utilisez la référence ici
      />
      <ul>
        {filteredResults.map((result, index) => (
          <li key={index} onClick={() => handleAddElement(result)}>
            {result.French}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchType;
