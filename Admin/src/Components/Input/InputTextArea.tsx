import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputTextAreaProps {
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  cols?: number;
  rows?: number;
  disabled?: boolean;
  error?: string;
  maxLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const InputTextArea: React.FC<InputTextAreaProps> = ({
  name,
  value,
  label,
  placeholder = '',
  onChange,
  className = '',
  cols = 30,
  rows = 5,
  disabled = false,
  error = '',
  maxLength,
  resize = 'vertical'
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [characterCount, setCharacterCount] = useState(value.length);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCharacterCount(value.length);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    if (maxLength) {
      setCharacterCount(e.target.value.length);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* TextArea Field with Static Label */}
      <div className="relative">
        <motion.textarea
          ref={textareaRef}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder} // Always show placeholder if provided
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          cols={cols}
          rows={rows}
          maxLength={maxLength}
          className={`w-full text-gray-800 px-4 py-3 border rounded-lg focus:outline-none transition-all ${
            error
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : isFocused
                ? 'border-blue-500 focus:ring-2 focus:ring-blue-200'
                : 'border-gray-300'
          } ${
            disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'
          } ${
            resize === 'none' ? 'resize-none' :
            resize === 'both' ? 'resize' :
            resize === 'horizontal' ? 'resize-x' : 'resize-y'
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
        
        {/* Static Label (shows when empty and not focused) */}
        {/* {!value && !isFocused && (
          <label
            htmlFor={name}
            className={`absolute left-4 top-4 pointer-events-none text-gray-500 ${
              disabled ? 'opacity-70' : ''
            }`}
          >
            {label}55
          </label>
        )} */}
      </div>

      {/* Character Counter (if maxLength is provided) */}
      {maxLength && (
        <div className={`text-xs pr-2 text-right ${
          characterCount >= maxLength ? 'text-red-500' : 'text-gray-500'
        }`}>
          {characterCount} / {maxLength}
        </div>
      )}

      {/* Error Message (animated) */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputTextArea;