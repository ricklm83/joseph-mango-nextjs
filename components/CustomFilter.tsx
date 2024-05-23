import { CustomFilterProps } from '@/types';
import { useState } from 'react';

// CUSTOM FILTER NOT YET APPLIED
const CustomFilter = ({ filter, setFilter, onFilterChange }: CustomFilterProps) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange('customFilterKey', value);
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Enter filter value"
      />
    </div>
  );
};

export default CustomFilter;
