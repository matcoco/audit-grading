import React from 'react';

const TypeProdutcs = ({ selectType, currentType }) => {
  const types = ["LT", "PC", "OT", "FS", "LP", "SV", "SP"];

  return (
    <div>
      <h1>Type de produits</h1>
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
      </div>
    </div>
  );
};

export default TypeProdutcs;
