"use client";
import React, { useEffect, useState } from "react";
import { deleteCall, getCall } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FiEdit, FiTrash2, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getCall(`/products/${params.id}`);
      if (response?.status === 200) {
        setProduct(response.data);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      setDeleteLoading(true);
      const response = await deleteCall(`/products/${params.id}`);
      if (response?.status === 200) {
        router.push("/admin/products");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
        <Link
          href="/dashboard/product-list"
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-1" /> Back to products
        </Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard/product-list"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-1" /> Back to products
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <div className="relative h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product?.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((img: any, index: number) => (
                  <div
                    key={index}
                    className="relative h-20 bg-gray-100 rounded overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 mb-2">{product.brand}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/admin/products/edit/${product._id}`}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
                >
                  <FiEdit className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <div className="flex items-center bg-blue-50 px-3 py-1 rounded">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-sm font-medium">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              {product.isNew && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  NEW
                </span>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Description
              </h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">Pricing</h2>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.discountedPrice}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${product.price}
                    </span>
                    <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Stock</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {product.stock > 0 ? (
                    <span className="text-green-600">
                      {product.stock} available
                    </span>
                  ) : (
                    <span className="text-red-600">Out of stock</span>
                  )}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {product.sku || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {product.category || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Created At
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Colors</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((color: any, index: number) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Sizes</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size: any, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
