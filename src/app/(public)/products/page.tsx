"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Liste des produits</h1>
      <ul className="space-y-4">
        {products.map((product: any) => (
          <li key={product.id} className="border rounded p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-sm text-gray-500">Prix : {product.price} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
}