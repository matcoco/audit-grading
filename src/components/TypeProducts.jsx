import React from 'react';

const TypeProdutcs = ({ selectType, currentType, openTableWindow }) => {
  const types = ["LT", "PC", "OT", "FS", "LP", "SV", "SP"];

  return (
    <div>
      <div className="type-products-header">
        <h1>Type de produits</h1>
      </div>
      <div className="radio-group">
        {types.map((type) => (
          <label key={type}>
            <input
              type="radio"
              name="type"
              value={type}
              checked={currentType === type}
              onChange={() => selectType(type)}
            />
            {type}
          </label>
        ))}
         <button onClick={openTableWindow} className="info-button">i</button>
      </div>
     
    </div>
  );
};

export default TypeProdutcs;
