import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface SortConfig {
  key: string;
  direction: "ascending" | "descending";
}

interface Column<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (rowData: T) => React.ReactNode;
  textColor?: string;
  width?: string | number;
  align?: "left" | "center" | "right";
}

interface CustomTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  keyField?: string;
  onRowClick?: (rowData: T) => void;
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  rowAnimation?: boolean;
  hoverEffects?: boolean;
  className?: string;
  rowClassName?: string | ((rowData: T) => string);
  headerClassName?: string;
  cellClassName?: string | ((rowData: T, columnKey: string) => string);
}

const CustomTable = <T extends Record<string, any>>({
  data,
  columns,
  keyField = "id",
  onRowClick,
  sortConfig,
  onSort,
  isLoading = false,
  emptyMessage = "No data available",
  rowAnimation = true,
  hoverEffects = true,
  className = "",
  rowClassName,
  headerClassName,
  cellClassName,
}: CustomTableProps<T>) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: rowAnimation ? { opacity: 0, y: 10 } : { opacity: 1 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const cellVariants = {
    hover: hoverEffects ? { scale: 1.01 } : {},
  };

  const handleSort = (key: string, isSortable?: boolean) => {
    if (onSort && isSortable) {
      onSort(key);
    }
  };

  const handleRowClick = (rowData: T) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  const getRowClassName = (rowData: T) => {
    const baseClass = onRowClick ? "cursor-pointer" : "";
    const dynamicClass =
      typeof rowClassName === "function" ? rowClassName(rowData) : rowClassName;
    return `${baseClass} ${dynamicClass || ""} ${
      hoverEffects
        ? "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        : ""
    }`.trim();
  };

  const getCellClassName = (rowData: T, columnKey: string) => {
    const baseClass = "px-6 py-4 whitespace-nowrap text-sm";
    const colorClass =
      columns.find((c) => c.key === columnKey)?.textColor ||
      "text-gray-600 dark:text-gray-200";

    let dynamicClass = "";
    if (typeof cellClassName === "function") {
      dynamicClass = cellClassName(rowData, columnKey);
    } else if (cellClassName) {
      dynamicClass = cellClassName;
    }

    return `${baseClass} ${colorClass} ${dynamicClass}`.trim();
  };

  return (
    <motion.div
      className={`overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-50 ">
        <thead
          className={`bg-gray-50 dark:bg-gray-800 ${headerClassName || ""}`}
        >
          <motion.tr>
            {columns?.map((column) => (
              <motion.th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                  column.sortable ? "cursor-pointer" : ""
                } ${column.align ? `text-${column.align}` : ""}`}
                style={{ width: column.width }}
                whileHover={column.sortable ? { scale: 1.02 } : {}}
                whileTap={column.sortable ? { scale: 0.98 } : {}}
                onClick={() => handleSort(column.key, column.sortable)}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && sortConfig?.key === column.key && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-1"
                    >
                      {sortConfig?.direction === "ascending" ? "↑" : "↓"}
                    </motion.span>
                  )}
                </div>
              </motion.th>
            ))}
          </motion.tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {isLoading ? (
            <motion.tr variants={rowVariants}>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                Loading...
              </td>
            </motion.tr>
          ) : data.length === 0 ? (
            <motion.tr variants={rowVariants}>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                {emptyMessage}
              </td>
            </motion.tr>
          ) : (
            <AnimatePresence>
              {data?.map((row) => (
                <motion.tr
                  key={row[keyField] as React.Key}
                  className={getRowClassName(row)}
                  variants={rowVariants}
                  whileHover={hoverEffects ? { scale: 1.01 } : {}}
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((column) => (
                    <motion.td
                      key={`${row[keyField]}-${column.key}`}
                      className={getCellClassName(row, column.key)}
                      variants={cellVariants}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </motion.td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default CustomTable;
