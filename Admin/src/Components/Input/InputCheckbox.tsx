import React from 'react';
import { motion } from 'framer-motion';

interface InputCheckboxProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  disabled?: boolean;
  className?: string;
  labelPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  label,
  name,
  onChange,
  checked,
  disabled = false,
  className = '',
  labelPosition = 'right',
  size = 'md',
  indeterminate = false,
}) => {
  // Size variants with improved proportions
  const sizeVariants = {
    sm: {
      box: 'w-4 h-4 rounded-sm',
      label: 'text-sm',
      check: 'w-2.5 h-2.5',
      indeterminate: 'w-2.5 h-[2px]',
      spacing: 'gap-2'
    },
    md: {
      box: 'w-5 h-5 rounded',
      label: 'text-base',
      check: 'w-3.5 h-3.5',
      indeterminate: 'w-3.5 h-[2px]',
      spacing: 'gap-3'
    },
    lg: {
      box: 'w-6 h-6 rounded-md',
      label: 'text-lg',
      check: 'w-4 h-4',
      indeterminate: 'w-4 h-[3px]',
      spacing: 'gap-3'
    }
  };

  // Color variants
  const colorVariants = {
    default: {
      checked: 'bg-blue-600 border-blue-600',
      unchecked: 'border-gray-300',
      hover: 'hover:border-blue-400',
      disabled: 'bg-gray-100 border-gray-300'
    },
    error: {
      checked: 'bg-red-600 border-red-600',
      unchecked: 'border-red-300',
      hover: 'hover:border-red-400',
      disabled: 'bg-gray-100 border-gray-300'
    }
  };

  return (
    <div className={`inline-flex items-start ${className}`}>
      {/* Hidden native checkbox for accessibility */}
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        ref={(el) => {
          if (el) {
            el.indeterminate = indeterminate;
          }
        }}
      />

      {/* Custom checkbox container */}
      <label
        htmlFor={name}
        className={`flex items-center ${sizeVariants[size].spacing} ${
          disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
        } ${
          labelPosition === 'left' ? 'flex-row-reverse' : ''
        } select-none group`}
      >
        {/* Custom checkbox visual */}
        <motion.div
          className={`flex items-center justify-center border-2 transition-all ${
            sizeVariants[size].box
          } ${
            checked || indeterminate
              ? colorVariants.default.checked
              : colorVariants.default.unchecked
          } ${
            disabled
              ? colorVariants.default.disabled
              : colorVariants.default.hover
          }`}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {/* Checkmark or indeterminate indicator */}
          <motion.div
            className={`flex items-center justify-center text-white`}
            initial={false}
            animate={{
              opacity: checked || indeterminate ? 1 : 0,
              scale: checked || indeterminate ? 1 : 0.8
            }}
            transition={{ duration: 0.15 }}
          >
            {indeterminate && !checked ? (
              <motion.div 
                className={`bg-white ${sizeVariants[size].indeterminate}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.15 }}
              />
            ) : (
              <motion.svg
                className={sizeVariants[size].check}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: checked ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.svg>
            )}
          </motion.div>
        </motion.div>

        {/* Label with better typography */}
        <span className={`${sizeVariants[size].label} ${
          disabled ? 'text-gray-500' : 'text-gray-700 group-hover:text-gray-900'
        } transition-colors`}>
          {label}
        </span>
      </label>
    </div>
  );
};

export default InputCheckbox;