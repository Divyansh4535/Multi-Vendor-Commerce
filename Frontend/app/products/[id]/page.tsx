"use client";
import React from "react";
import { notFound } from "next/navigation";
import { featuredProducts } from "@/data/products";
import ProductDetails from "@/components/products/ProductDetails";
import RelatedProducts from "@/components/products/RelatedProducts";
import { useEffect, useState } from "react";
import { getRequest } from "@/connections/apiCall";
import { apiEndPoint } from "@/connections/endPoints";

interface paramType {
  params: { id: string };
}

const page = ({ params }: paramType) => {
  console.log("string", params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const getProduct = async () => {
    setLoading(true);

    try {
      const response = await getRequest(
        apiEndPoint.getProducts + "/" + params.id
      );
      if (response?.status === 200) {
        setProduct(response?.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // if (!product) {
  //   return notFound();
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
      <RelatedProducts
        currentProductId={product?.id}
        category={product?.category}
      />
    </div>
  );
};

export default page;
