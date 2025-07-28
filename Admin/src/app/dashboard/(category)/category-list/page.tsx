"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/Components/Layout/dashboard-layout";
import { getCall } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  FiEdit2,
  FiEye,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";
import Link from "next/link";
import CustomTable from "@/Components/Table/CustomTable";

interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  showOnHome: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CategoryResponse {
  status: boolean;
  data: {
    category: Category[];
    total: number;
  };
  msg?: string;
}

const CategoryListPage = () => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const getCategoryList = async () => {
    try {
      setLoading(true);
      const result: CategoryResponse = await getCall("/get-category");
      if (result.status) {
        setCategoryData(result.data.category || []);
      } else {
        toast.error(result.msg || "Failed to load categories");
      }
    } catch (error) {
      console.error("get Category List Error ", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleStatusToggle = async (categoryId: string) => {
    try {
      // Implement your status toggle API call here
      // Example: await toggleStatusCall(`/category/${categoryId}/toggle-status`);
      toast.success("Category status updated");
      getCategoryList(); // Refresh the list
    } catch (error) {
      console.error("Toggle status error:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (categoryId: string) => {
    try {
      // Implement your delete API call here
      // Example: await deleteCall(`/category/${categoryId}`);
      toast.success("Category deleted successfully");
      getCategoryList(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete category");
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row: Category) => row.name,
      sortable: true,
      cell: (row: Category) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {row.name}
        </span>
      ),
    },
    {
      name: "Slug",
      selector: (row: Category) => row.slug,
      sortable: true,
      cell: (row: Category) => (
        <span className="text-gray-600 dark:text-gray-400">{row.slug}</span>
      ),
    },
    {
      name: "Status",
      selector: (row: Category) => row.isActive,
      sortable: true,
      cell: (row: Category) => (
        <button
          onClick={() => handleStatusToggle(row._id)}
          className="flex items-center"
          aria-label={
            row.isActive ? "Deactivate category" : "Activate category"
          }
        >
          {row.isActive ? (
            <FiToggleRight className="h-5 w-5 text-green-500" />
          ) : (
            <FiToggleLeft className="h-5 w-5 text-gray-400" />
          )}
          <span className="ml-1">{row.isActive ? "Active" : "Inactive"}</span>
        </button>
      ),
    },
    {
      name: "Created At",
      selector: (row: Category) => row.createdAt,
      sortable: true,
      cell: (row: Category) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Category) => (
        <div className="flex space-x-2">
          <Link
            href={`/dashboard/categories/view/${row._id}`}
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            title="View category"
          >
            <FiEye className="h-5 w-5" />
          </Link>
          <Link
            href={`/dashboard/categories/edit/${row._id}`}
            className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            title="Edit category"
          >
            <FiEdit2 className="h-5 w-5" />
          </Link>
          <button
            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            title="Delete category"
            onClick={() => {
              if (confirm("Are you sure you want to delete this category?")) {
                handleDelete(row._id);
              }
            }}
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const rowClass = (row: Category) => {
    return !row.isActive ? "bg-gray-100 dark:bg-gray-800/50" : "";
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Categories
          </h1>
          <Link
            href="/dashboard/categories/create"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Add New Category
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
          <CustomTable
            data={categoryData}
            columns={columns}
            keyField="_id"
            rowClassName={rowClass}
            isLoading={loading}
            className="dark"
            emptyMessage="No categories found"
            onRowClick={(category: Category) =>
              router.push(`/dashboard/categories/view/${category._id}`)
            }
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CategoryListPage;
