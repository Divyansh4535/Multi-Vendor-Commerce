"use client";
import { getCall, postCall, deleteCall, patchCall } from "@/lib/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiEye, FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { toast } from "sonner";
import CustomTable from "@/Components/Table/CustomTable";
import CustomSwitch from "@/Components/Input/Switch/CustomSwitch";
import { EyeIcon, TrashIcon, View } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  view: number;
  stock: number;
  vendor: {
    fullname: string;
    username: string;
    email: string;
  };
  isActive: boolean;
  isFeatured: boolean;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [isActiveProduct, setIsActiveProduct] = useState(false);
  const columns = [
    {
      key: "title",
      header: "Product Name",
      render: (item: Product) => (
        <span className="font-medium">{item.title}</span>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      render: (item: Product) => (
        <span className="font-medium">{item.slug}</span>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (item: Product) => `$${item.price.toFixed(2)}`,
      align: "right" as const,
    },
    {
      key: "category",
      header: "Category",
      render: (item: Product) => `${item.category}`, // Removed $ prefix
    },
    {
      key: "view",
      header: "View Count",
      render: (item: Product) => `${item.view}`, // Removed $ prefix
    },
    {
      key: "stock",
      header: "Inventory",
      render: (item: Product) => `${item.stock}`, // Removed $ prefix
    },
    {
      key: "vendorName",
      header: "Vendor Name",
      render: (item: Product) => item.vendor?.fullname || "N/A", // Added null check
    },
    {
      key: "vendorUsername",
      header: "Vendor Username",
      render: (item: Product) => item.vendor?.username || "N/A", // Added null check
    },
    {
      key: "vendorEmail",
      header: "Vendor Email",
      render: (item: Product) => item.vendor?.email || "N/A", // Added null check
    },
    {
      key: "isActive",
      header: "Status",
      render: (item: Product) => (
        <span>
          <CustomSwitch
            defaultChecked={item.isActive}
            onChange={(val) => handleIsActiveProduct(item._id, val)}
          />
        </span>
      ),
      align: "right" as const,
    },
    {
      key: "isFeatured",
      header: "Featured",
      render: (item: Product) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            item.isFeatured
              ? "bg-purple-100 text-purple-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {item.isFeatured ? "Yes" : "No"}
        </span>
      ),
      align: "right" as const,
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Product) => (
        <div className="flex space-x-2">
          <Link href={`/dashboard/product-details/${item._id}`} passHref>
            <button
              className="p-2 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
              aria-label="Edit product"
            >
              <EyeIcon className="w-5 h-5" /> {/* Using an eye icon for view */}
            </button>
          </Link>
          <button
            onClick={() => handleDelete(item._id)}
            disabled={deleteLoading}
            className="p-2 text-rose-400 hover:text-rose-300 cursor-pointer transition-colors disabled:opacity-50"
            aria-label="Delete product"
          >
            <TrashIcon className="w-5 h-5" /> {/* Using a trash icon */}
          </button>
        </div>
      ),
    },
  ];
  const rowClass = (product: Product) =>
    product.stock === 0 ? "bg-gray-100" : "";

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getCall("/get-products");

      if (response?.status) {
        setTotal(response?.data?.totalProducts || 0);
        setProducts(response?.data?.products || []);
      } else {
        toast.error(response?.msg || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Get Product Error:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleIsActiveProduct = async (id: string, value: Boolean) => {
    try {
      const result = await patchCall(`product-edit/${id}`, {
        isActive: value,
      });
      if (result.status) {
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      console.error("product activation Error ", error);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setDeleteLoading(true);
      const response = await deleteCall(`/product-delete/${productId}`);

      if (response?.status === 200) {
        toast.success(response.msg || "Product deleted successfully");
        getProducts();
      } else {
        toast.error(response?.msg || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete product");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className=" w-full h-[calc(100vh-15vh)] overflow-y-auto mx-auto px-4 py-8">
      <div className="flex justify-between text-gray-800 dark:text-white items-center mb-8">
        <h1 className="text-2xl font-bold ">Product Management</h1>
        <div className="flex items-center space-x-4">
          <span className="">
            Showing {products.length} of {total} products
          </span>
          <Link href="/admin/products/add" passHref>
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              <FiPlus className="mr-2" />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow w-full overflow-x-auto ">
        <CustomTable<Product>
          data={products}
          columns={columns}
          keyField="id"
          rowClassName={rowClass}
          isLoading={loading}
          className="dark" // or omit for light mode
          emptyMessage="No products found"
          onRowClick={(product) => console.log("Selected product:", product)}
        />
      </div>
    </div>
  );
};

export default ProductList;
