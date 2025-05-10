"use client";

import React from 'react';

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  required?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  min,
  max,
  maxLength,
  required = false
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        maxLength={maxLength}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
        placeholder={placeholder}
      />
    </div>
  );
};

interface SelectInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required = false
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

interface CheckboxInputProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  id,
  name,
  label,
  checked,
  onChange
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
};

interface TextAreaInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  required = false
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
        placeholder={placeholder}
      />
    </div>
  );
};

interface MoneyInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string | number;
  required?: boolean;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = '',
  min = '0',
  required = false
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
          $
        </span>
        <input
          type="number"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          required={required}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default {
  TextInput,
  SelectInput,
  CheckboxInput,
  TextAreaInput,
  MoneyInput
};
