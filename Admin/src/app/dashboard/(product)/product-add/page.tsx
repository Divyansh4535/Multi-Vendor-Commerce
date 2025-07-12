"use client"
import CustomImageUpload from "@/Components/Input/CustomImageUpload";
import CustomSelect from "@/Components/Input/CustomSelect";
import { CustomColorSelector, CustomFeatureList, CustomSection } from "@/Components/Input/Input";
import InputCheckbox from "@/Components/Input/InputCheckbox";
import { InputText } from "@/Components/Input/InputText";
import InputTextArea from "@/Components/Input/InputTextArea";
import { postCall } from "@/lib/api";
import React, { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2, FiUpload, FiInfo } from "react-icons/fi";

interface ProductFormData {
  name: string;
  brand: string;
  category: string;
  description: string;
  price: string;
  discount: string;
  discountedPrice: string;
  rating: string;
  reviewCount: string;
  isNew: boolean;
  images: string[];
  colors: string[];
  stock: string;
  features: string[];
}

const categories = [
  { value: "electronics", name: "Electronics", id: 1 },
  { value: "clothing", name: "Clothing", id: 2 },
  { value: "home", name: "Home & Garden", id: 3 },
  { value: "beauty", name: "Beauty", id: 4 },
  { value: "sports", name: "Sports & Outdoors", id: 5 },
];

const COLORS = [
  { value: "red", name: "Red", id: 1 },
  { value: "blue", name: "Blue", id: 2 },
  { value: "yellow", name: "Yellow", id: 3 },
  { value: "blue", name: "Blue", id: 4 },
  { value: "black", name: "Black", id: 5 },
];

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    discount: "",
    discountedPrice: "",
    rating: "",
    reviewCount: "",
    isNew: false,
    images: [],
    colors: [],
    stock: "",
    features: [""],
  });

  const [activeSection, setActiveSection] = useState("basic");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value } = target;

    const finalValue = target instanceof HTMLInputElement && target.type === "checkbox"
      ? (target as HTMLInputElement).checked
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    if (name === "price" || name === "discount") {
      const price = name === "price" ? parseFloat(value) : parseFloat(formData.price);
      const discount = name === "discount" ? parseFloat(value) : parseFloat(formData.discount);

      if (!isNaN(price) && !isNaN(discount) && discount > 0) {
        const discountedPrice = price - (price * discount / 100);
        setFormData(prev => ({
          ...prev,
          discountedPrice: discountedPrice.toFixed(2)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          discountedPrice: ""
        }));
      }
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).map((file) => URL.createObjectURL(file)) : [];
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 8),
    }));
  };

  const removeImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index: number) => {
    const updated = [...formData.features];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      const result = await postCall(`products/add`, payload);
      if (result.status) {
        toast.success(result.message || "Product submitted successfully!");
      } else {
        toast.error(result.message || "Failed to submit product");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the product");
    }
  };

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <div className="max-w-6xl min-h-screen p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Add New Product</h1>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto mb-8 border-b border-gray-200 dark:border-gray-700">
        {["basic", "pricing", "media", "inventory", "attributes"].map((section) => (
          <button
            key={section}
            className={`px-4 py-2 font-medium text-sm capitalize transition-colors ${
              activeSection === section 
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400" 
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <CustomSection title="Basic Information" isActive={activeSection === "basic"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Wireless Headphones"
            />
            <InputText
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g., Sony"
            />
            <CustomSelect
              option={categories}
              onChange={(values) => setSelectedValues(values as string[])}
              placeholder="Select a category"
              isSearch={true}
              className="w-full"
              isMultiple={true}
            />
          </div>

          <InputTextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter detailed product description..."
            maxLength={500}
          />

          <div className="flex flex-wrap gap-6">
            <InputCheckbox
              label="New Arrival"
              name="isNew"
              checked={formData.isNew}
              onChange={handleChange}
            />
          </div>
        </CustomSection>

        {/* Pricing Section */}
        <CustomSection title="Pricing" isActive={activeSection === "pricing"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputText
              label="Base Price ($)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <InputText
              label="Discount (%)"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
            />
            <InputText
              label="Discounted Price ($)"
              name="discountedPrice"
              type="number"
              value={formData.discountedPrice}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <InputText
              label="Rating (0-5)"
              name="rating"
              type="number"
              value={formData.rating}
              onChange={handleChange}
            />
            <InputText
              label="Review Count"
              name="reviewCount"
              type="number"
              value={formData.reviewCount}
              onChange={handleChange}
            />
          </div>
        </CustomSection>

        {/* Media Section */}
        <CustomSection title="Media" isActive={activeSection === "media"}>
          <div className="space-y-6">
            <CustomImageUpload
              onChange={handleImageUpload}
              images={formData.images}
            />

            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">Product Colors</h3>
              <CustomSelect
                option={COLORS}
                onChange={(values) => setSelectedValues(values as string[])}
                placeholder="Select Colors"
                isSearch={true}
                className="w-full"
                isMultiple={true}
              />
            </div>
          </div>
        </CustomSection>

        {/* Inventory Section */}
        <CustomSection title="Inventory" isActive={activeSection === "inventory"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
        </CustomSection>

        {/* Attributes Section */}
        <CustomSection title="Attributes" isActive={activeSection === "attributes"}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Product Features</h3>
              <CustomFeatureList
                features={formData.features}
                onAdd={addFeature}
                onRemove={removeFeature}
                onChange={handleFeatureChange}
              />
            </div>
          </div>
        </CustomSection>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;