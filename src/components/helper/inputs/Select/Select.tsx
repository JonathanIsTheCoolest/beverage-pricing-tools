import { useState, useEffect } from "react";

import styles from './Select.module.css';

export const Select = ({ options, value, onChange }: { options: { value: string, label: string }[], value: string, onChange: (value: string) => void }) => {
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
        {value}
      </button>
      {isOpen && (
        <div
          className={styles.optionsContainer}
        >
          {options.map((option) => (
            <button 
              key={option.value} 
              onClick={() => handleChange(option.value)} 
              className={styles.option}
              style={{
                border:  `2px solid ${option.value === value ? "red" : "black"}`,
              }}
            >{option.label}</button>
          ))}
        </div>
      )}
    </span>
  );
};