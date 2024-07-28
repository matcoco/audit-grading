import React from 'react';

const SearchType = ({ searchQuery, handleSearch, filteredResults, handleAddElement }) => {
  return (
    <div>
      <div className="search-container">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => handleSearch(e.target.value)} 
          placeholder="Rechercher un commentaire" 
        />
      </div>
      {filteredResults.length > 0 && (
        <div className="results">
          {filteredResults.map((comment, index) => (
            <div 
              key={index} 
              onClick={() => handleAddElement(comment)} 
              className="result-item"
            >
              {comment.French}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchType;
