import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';
import { FiChevronDown } from 'react-icons/fi';

function CustomSelect({
  options, // Array of { name: string, icon: Component }
  value,   // Currently selected value (string)
  onChange // Callback for when a new option is selected
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Find the selected option object to display its icon and name
  const selectedOption = options.find(option => option.name === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  const handleOptionClick = (optionName) => {
    onChange(optionName);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container" ref={selectRef}>
      <button
        type="button"
        className="custom-select-display"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption && selectedOption.icon && (
          <selectedOption.icon className="custom-select-icon" />
        )}
        {selectedOption ? selectedOption.name : 'Select Category'}
        <FiChevronDown className={`custom-select-arrow ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <ul className="custom-select-options">
          {options.map((option) => (
            <li
              key={option.name}
              className={`custom-select-option ${option.name === value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.name)}
            >
              {option.icon && <option.icon className="custom-select-icon" />}
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
