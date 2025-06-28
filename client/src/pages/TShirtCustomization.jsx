import React, { useState } from "react";

const TShirtCustomization = () => {
  const [color, setColor] = useState("#FFFFFF"); // Default white
  const [sizes, setSizes] = useState({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSizeChange = (size, quantity) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [size]: quantity,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customize Your T-Shirt</h1>
      <div
        style={{
          backgroundColor: color,
          width: "200px",
          height: "200px",
          margin: "20px",
        }}
      >
        T-Shirt Preview
      </div>
      <div>
        <label>Select Color: </label>
        <input type="color" value={color} onChange={handleColorChange} />
      </div>
      <div>
        <h3>Select Sizes:</h3>
        {Object.keys(sizes).map((size) => (
          <div key={size}>
            <label>{size}: </label>
            <input
              type="number"
              value={sizes[size]}
              min="0"
              onChange={(e) => handleSizeChange(size, parseInt(e.target.value))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TShirtCustomization;
