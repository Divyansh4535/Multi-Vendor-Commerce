"use client"
import React from "react";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface CustomImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  images: string[];
}
interface CustomFeatureListProps {
  features: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}



// ====================================================


// export const CustomImageUpload: React.FC<CustomImageUploadProps> = ({
//   onChange,
//   images,
// }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1">Upload Images</label>
//     <input type="file" accept="image/*" multiple onChange={onChange} />
//     <div className="flex gap-3 mt-2">
//       {images.map((img, idx) => (
//         <img key={idx} src={img} alt="preview" className="w-20 h-20 object-cover rounded" />
//       ))}
//     </div>
//   </div>
// );

// ====================================================

interface CustomColorSelectorProps {
  colors: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}

export const CustomColorSelector: React.FC<CustomColorSelectorProps> = ({
  colors,
  onAdd,
  onRemove,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">Colors</label>
    <div className="space-y-2">
      {colors.map((color, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={color}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder="Color"
          />
          <button type="button" onClick={() => onRemove(index)} className="text-red-600 font-semibold">X</button>
        </div>
      ))}
      <button type="button" onClick={onAdd} className="text-blue-600 font-semibold">+ Add Color</button>
    </div>
  </div>
);

// =======================================================


export const CustomFeatureList: React.FC<CustomFeatureListProps> = ({
  features,
  onAdd,
  onRemove,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">Features</label>
    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={feature}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder="Feature"
          />
          <button type="button" onClick={() => onRemove(index)} className="text-red-600 font-semibold">X</button>
        </div>
      ))}
      <button type="button" onClick={onAdd} className="text-blue-600 font-semibold">+ Add Feature</button>
    </div>
  </div>
);



// ================================

interface CustomSectionProps {
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export const CustomSection: React.FC<CustomSectionProps> = ({
  title,
  children,
  isActive = true,
  collapsible = false,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  if (!isActive) return null;

  return (
    <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200">
      <div 
        className={`flex justify-between items-center cursor-pointer ${collapsible ? 'mb-4' : 'mb-6'}`}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>
        {collapsible && (
          <span className="text-gray-500">
            {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </span>
        )}
      </div>
      
      <div className={`space-y-4 ${collapsible && !isOpen ? 'hidden' : 'block'}`}>
        {children}
      </div>
    </section>
  );
};

