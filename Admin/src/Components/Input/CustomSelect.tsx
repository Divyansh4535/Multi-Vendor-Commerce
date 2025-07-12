import { ChevronDown, ChevronUp, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomSelectProps {
  option: Array<{ value: string; name: string; id: number }>;
  onChange?: (value: string | string[]) => void;
  value?: string | string[];
  placeholder?: string;
  isDisable?: boolean;
  isSearch?: boolean;
  isMultiple?: boolean;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  option = [],
  onChange,
  value,
  placeholder,
  isDisable = false,
  isSearch = false,
  isMultiple = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(Array.isArray(value) ? value : value ? [value] : []);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  // Filter options based on search query
  const filteredOptions = option?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionClick = (value: string) => {
    if (isMultiple) {
      const updatedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(updatedValues);
      onChange?.(updatedValues); // Always passes string[] in multi-select mode
    } else {
      setSelectedValues([value]);
      onChange?.(value); // Passes string in single-select mode
      setIsOpen(false);
    }
    setSearchQuery('');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };


  function getDisplayValue() {
    if (selectedValues.length === 0) {
      return <span className="text-neutral-500">{placeholder || "Select Option"}</span>;
    }

    if (isMultiple) {
      const selectedOptions = option?.filter((item) => selectedValues?.includes(item.value));
      return (
        <div className="flex flex-wrap gap-1 overflow-y-auto max-h-[180px] py-1 pr-2 ">
          {selectedOptions?.map((item) => (
            <span
              key={item.value}
              className="inline-flex items-center bg-sky-100 text-blue-900 py-1 px-2 rounded-full text-sm"
            >
              {item.name}
              <button
                type="button"
                className="ml-1 text-blue-600 hover:text-blue-800 cursor-pointer hover:rotate-90"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(item.value);
                }}
              >
               <X size={12}/> 
              </button>
            </span>
          ))}
        </div>
      );
    } else {
      const displayValue = option?.find((opt) => selectedValues?.includes(opt.value))?.name;
      return <span className="truncate">{displayValue}</span>;
    }
  }

  return (
    <motion.div
      ref={selectRef}
      className={`relative z-50 w-full ${className}`}
      onKeyDown={handleKeyDown}
    // whileHover={!isDisable ? { scale: 1.01 } : {}}
    // whileTap={!isDisable ? { scale: 0.98 } : {}}
    >
      {/* Select Trigger */}

      <motion.div
        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${isDisable
            ? 'bg-neutral-100 cursor-not-allowed opacity-70'
            : 'hover:border-neutral-400 bg-white'
          } ${isOpen
            ? 'border-primary-500 ring-2 ring-primary-100'
            : 'border-neutral-200'
          }`}
        onClick={() => !isDisable && setIsOpen(!isOpen)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        tabIndex={0}
        animate={{
          backgroundColor: isOpen ? '#ffffff' : '#ffffff'
        }}
      >
        <motion.div className={`flex-1 min-w-0 ${selectedValues.length ? 'text-neutral-800' : 'text-neutral-500'}`}>
          {getDisplayValue()}
        </motion.div>
        <motion.span
          className="text-neutral-400 ml-2 flex-shrink-0"
          animate={{
            rotate: isOpen ? 180 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </motion.span>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Search Input */}
            {isSearch && (
              <motion.div
                className="p-2 border-b border-neutral-100 bg-neutral-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </motion.div>
            )}

            {/* Options List */}
            <motion.ul
              className="max-h-60 overflow-y-auto"
              role="listbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item, index) => (
                  <motion.li
                    key={item.id}
                    className={`p-3 cursor-pointer transition-colors text-sm ${selectedValues.includes(item.value)
                      ? 'bg-sky-50 text-blue-900 font-semibold'
                      : 'hover:bg-neutral-500 text-neutral-700'
                      }`}
                    onClick={() => handleOptionClick(item.value)}
                    role="option"
                    aria-selected={selectedValues.includes(item.value)}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ backgroundColor: '#f5f5f5' }}
                    whileTap={{ backgroundColor: '#e5e5e5' }}
                  >
                    {item.name}
                  </motion.li>
                ))
              ) : (
                <motion.li
                  className="p-3 text-sm text-neutral-500 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No options found
                </motion.li>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomSelect;