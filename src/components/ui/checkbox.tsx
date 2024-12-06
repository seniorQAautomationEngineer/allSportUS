import React from 'react';

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked = false,
  onCheckedChange,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    }
  };

  return (
    <input
      id={id}
      type="checkbox"
      className={`w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
      checked={checked}
      onChange={handleChange}
    />
  );
};
