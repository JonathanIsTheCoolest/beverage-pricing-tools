import { useState, useEffect } from "react";
import { camelCaseToTitleCase } from "../../../../helpers/general/caseFormatting";

import styles from './Select.module.css';

export const Select = ({ options, value, onChange }: { options: string[], value: string, onChange: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest('#select-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <span 
      style={{ 
        position: "relative",
      }}
      id="select-container"
    >
      <button className={styles.selectedOption} onClick={() => setIsOpen(!isOpen)}>
        {camelCaseToTitleCase(value)}
      </button>
      {isOpen && (
        <div
          className={styles.optionsContainer}
        >
          {options.map((option) => (
            <div 
              key={option} 
              onClick={() => handleChange(option)} 
              className={styles.option}
              style={{
                color: option === value ? "red" : "white",
              }}
            >{camelCaseToTitleCase(option)}</div>
          ))}
        </div>
      )}
    </span>
  );
};