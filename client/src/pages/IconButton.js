import React from "react";

const IconButton = ({ icon, label, onClick }) => {
  return (
    <button className="icon-button" onClick={onClick}>
      {icon && <img src={icon} alt={label} className="icon-image" />}
      <span>{label}</span>
    </button>
  );
};

export default IconButton;
