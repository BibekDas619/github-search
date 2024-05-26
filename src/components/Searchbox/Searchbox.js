import React from "react";
import "./Searchbox.css";

const Searchbox = ({ searchPhrase, setSearchPhrase }) => {
  return (
        <input
        type="text"
        placeholder="Enter anything to search.."
        value={searchPhrase}
        onChange={(event) => setSearchPhrase(event.target.value)}
      />
  
  );
};

export default Searchbox;
