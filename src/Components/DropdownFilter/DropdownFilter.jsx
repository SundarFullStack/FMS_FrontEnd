import React, { useState,useContext} from "react";
import "./dropdownFilter.css";
import { FaSortDown } from "react-icons/fa6";
import {LoginContext} from "../Context/ContextProvider"

const DropdownFilter = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);
    const [isVisible, setIsVisible] = useState(false);
    const { prodName, setProdName } = useContext(LoginContext);

    // console.log(data)
// Handling toggle events

  const toggleVisibilityME = () => {
    setIsVisible(!isVisible);
  };

    // Handling Changes happen in input

  const handleSearchChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filter the data based on the search term
    const filteredResults = data.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
    };
    
    // Handling List onClick event

    const handleList = (result) => {
        setSearchTerm(result);
      setProdName(result);
      setIsVisible(!isVisible);
   }

   

  return (
    <>
      <div className="form-group">
        <label className="input-label">Product Name</label>
        <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={toggleVisibilityME}
                  required
                  className="input-style"
        />
        
        {isVisible && (
          <div className="scrollable-list">
            <ul className="dropdown-list-cover">
              {searchResults.length > 0 &&
                searchResults.map((result, index) => (
                    <li key={index + 1} className="dropdown-list" onClick={() => handleList(result)}>{result}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownFilter;
