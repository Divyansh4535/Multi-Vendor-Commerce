"use client";
import React, { useEffect, useState } from "react";
import { deleteCall, getCall } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiEdit,
  FiTrash2,
  FiArrowLeft,
  FiEye,
  FiPackage,
  FiTag,
  FiLayers,
  FiCalendar,
  FiStar,
  FiDollarSign,
  FiInfo,
} from "react-icons/fi";
import Link from "next/link";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const params = useParams();
  const router = useRouter();

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const response = await getCall(`/product-details/${params?.id}`);
      if (response?.status) {
        setProduct(response.data);
      } else {
        toast.error(response.msg || "Product not found");
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
      const response = await deleteCall(`/products/${params?.id}`);
      if (response?.status) {
        toast.success("Product deleted successfully");
        router.push("/dashboard/products-list");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getProductDetails();
    }
  }, [params?.id]);

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
        <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiInfo className="h-5 w-5 text-red-500 dark:text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
        <Link
          href="/dashboard/product-list"
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
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
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <FiArrowLeft className="mr-1" /> Back to products
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="md:flex">
          {/* Image Gallery */}
          <div className="md:w-1/2 p-6">
            <div className="relative h-64 md:h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              {product.imageUrls?.length > 0 ? (
                <Image
                  src={product.imageUrls[activeImage]}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                  No image available
                </div>
              )}
            </div>

            {product.imageUrls?.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.imageUrls.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-20 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden border-2 transition-all ${
                      activeImage === index
                        ? "border-blue-500 dark:border-blue-400"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {product.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Vendor: {product.vendor?.shopName || "N/A"}
                  </span>
                  {product.isFeatured && (
                    <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded">
                      FEATURED
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/admin/products/edit/${product._id}`}
                  className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full transition-colors"
                  title="Edit product"
                >
                  <FiEdit className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-gray-700 rounded-full transition-colors"
                  title="Delete product"
                >
                  {deleteLoading ? (
                    <div className="h-5 w-5 border-2 border-red-600 dark:border-red-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FiTrash2 className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Rating and Status */}
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded">
                <FiStar className="text-yellow-400 mr-1" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {product.rating || "No"} ratings
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`text-sm font-medium px-2.5 py-0.5 rounded ${
                    product.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                <FiInfo className="mr-2" /> Description
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {product.description || "No description available"}
              </p>
            </div>

            {/* Pricing */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                <FiDollarSign className="mr-2" /> Pricing
              </h2>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{product.price}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="ml-2 text-lg text-gray-500 dark:text-gray-400 line-through">
                      ₹{product.mrp}
                    </span>
                    <span className="ml-2 text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-2 py-0.5 rounded">
                      {Math.round(
                        ((product.mrp - product.price) / product.mrp) * 100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Key Details */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <FiPackage className="mr-2" /> Stock
                </h3>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {product.stock > 0 ? (
                    <span className="text-green-600 dark:text-green-400">
                      {product.stock} available
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">
                      Out of stock
                    </span>
                  )}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <FiTag className="mr-2" /> Category
                </h3>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {product.category || "N/A"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <FiCalendar className="mr-2" /> Created At
                </h3>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date(product.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <FiEye className="mr-2" /> Views
                </h3>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {product.views || 0}
                </p>
              </div>
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                  <FiLayers className="mr-2" /> Variants
                </h2>
                <div className="mt-2 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Color
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Stock
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {product.variants.map((variant: any, index: number) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            <div className="flex items-center">
                              <div
                                className="w-4 h-4 rounded-full mr-2 border border-gray-200"
                                style={{
                                  backgroundColor:
                                    variant.color.toLowerCase() === "white"
                                      ? "#ffffff"
                                      : variant.color.toLowerCase(),
                                }}
                                title={variant.color}
                              />
                              {variant.color}
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {variant.size}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {variant.stock}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Product ID
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-300 font-mono break-all">
                {product._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
