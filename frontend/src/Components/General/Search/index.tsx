import React from 'react'

interface SearchProps {
      placeholder: string;
      leadingIcon?: React.ReactNode;
      trailingIcon?: React.ReactNode;
      focusColor?: string;
    }

const Search = ({placeholder, leadingIcon, trailingIcon, focusColor}: SearchProps) => {
  return (
    
        <div className="relative">
          {leadingIcon && <div className="absolute inset-y-0 left-0 flex items-center pl-3">{leadingIcon}</div>}
          <input
            type="text"
            placeholder={placeholder}
            className={`w-full border bg-background border-gray-300 rounded-lg py-2 pl-10 pr-3  ${focusColor} ${
              trailingIcon ? 'pr-10' : ''
            }`}
          />
          {trailingIcon && <div className="absolute inset-y-0 right-0 flex items-center pr-3">{trailingIcon}</div>}
        </div>
      );
  
}

export default Search