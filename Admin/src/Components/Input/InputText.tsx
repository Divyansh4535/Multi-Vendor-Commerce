import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputTextProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  row?: number;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  value,
  placeholder = '',
  onChange,
  type = "text",
  error = '',
  disabled = false,
  className = '',
  row,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Input Field with Static Label */}
      <div className="relative">
        {/* Label remains inside input */}
        {(!value && !isFocused) && (
          <label
            htmlFor={name}
            className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 ${disabled ? 'opacity-50' : ''}`}
          >
            {label}
          </label>
        )}
        
        <motion.input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={isFocused ? placeholder : ''}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 text-gray-900 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            error
              ? 'border-error-500 focus:ring-error-200'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
          } ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
          }`}
          animate={{
            borderColor: error
              ? '#EF4444'
              : isFocused
                ? '#3B82F6'
                : '#D1D5DB',
            boxShadow: isFocused && !error
              ? '0 0 0 2px rgba(59, 130, 246, 0.2)'
              : 'none'
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-sm text-error-500"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};