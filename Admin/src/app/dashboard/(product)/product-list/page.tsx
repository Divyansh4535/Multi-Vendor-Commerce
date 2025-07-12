"use client";
import { getCall, postCall, deleteCall } from "@/lib/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiEye, FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import Link from "next/link";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getProducts = async () => {
    const payload = {
      search: "",
      page: 1,
      limit: 10,
      all: false,
    };
    try {
      setLoading(true);
      const response = await postCall("/products", payload);
      if (response?.status === 200) {
        setTotal(response?.data?.total);
        setProducts(response?.data?.products);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: any) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      setDeleteLoading(true);
      const response = await deleteCall(`/products/${productId}`);
      if (response?.data?.status === 200) {
        // Refresh the product list after deletion
        getProducts();
      }
    } catch (error) {
      console.log("error", error);
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
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

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product: any) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.brand}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${product.discountedPrice}
                    </div>
                    {product.discount > 0 && (
                      <div className="text-xs text-gray-500 line-through">
                        ${product.price}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.stock > 0 ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/dashboard/product-list/${product._id}`}
                        passHref
                      >
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                          <FiEye className="h-5 w-5" />
                        </button>
                      </Link>
                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        passHref
                      >
                        <button className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50">
                          <FiEdit className="h-5 w-5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        disabled={deleteLoading}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination would go here */}
        {products.length < total && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductsPage;
