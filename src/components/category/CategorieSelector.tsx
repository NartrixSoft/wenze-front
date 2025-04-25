"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface Props {
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number) => void;
  categories: Category[]; // Ajouter la prop categories
}

export default function CategorieSelector({
  selectedCategory,
  onSelectCategory,
  categories,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  // Vérifier si categories est un tableau et le découper
  const quickCategories = Array.isArray(categories) ? categories.slice(0, 4) : [];
  const otherCategories = Array.isArray(categories) ? categories.slice(4) : [];

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-orange-700 mb-3">Catégories</h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide text-sm">
        <button
          onClick={() => onSelectCategory(null)}
          className={`whitespace-nowrap px-4 py-2 border rounded-full 
    ${selectedCategory === null ? "bg-orange-200" : "bg-orange-50"} 
    border-orange-300 text-orange-700 hover:bg-orange-100 transition duration-200`}
        >
          Tous
        </button>
        {quickCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 border rounded-full 
              ${selectedCategory === cat.id ? "bg-orange-200" : "bg-orange-50"} 
              border-orange-300 text-orange-700 hover:bg-orange-100 transition duration-200`}
          >
            {cat.name}
          </button>
        ))}
        {otherCategories.length > 0 && (
          <button
            onClick={() => setShowModal(true)}
            className="whitespace-nowrap px-4 py-2 border border-orange-300 rounded-full text-orange-700 bg-orange-50 hover:bg-orange-100 transition duration-200"
          >
            Autres
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-orange-700">
              Autres catégories
            </h3>
            <ul className="space-y-2">
              {otherCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setShowModal(false);
                    }}
                    className="w-full text-left text-sm text-gray-700 hover:bg-orange-100 px-3 py-2 rounded-md"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}