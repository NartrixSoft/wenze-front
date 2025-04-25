"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import LoadingMarketplace from "@/components/LoadingProduit";
import { useMessages } from "../context/MessageContext";
import { useSearch } from "../context/SearchContext";
import CategorieSelector from "@/components/category/CategorieSelector";
import FilterModal from "@/components/filtre/FilterModal";

export default function Home() {

  const [produits, setProduits] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);  // Ajouter une nouvelle variable d'état pour les tags
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { searchResults } = useSearch();
  const { setError } = useMessages();

  // États pour le modal de filtre
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: "relevance",
    selectedTags: [],
    priceMin: 0,
    priceMax: 10000,
    currencies: ["USD", "CDF"],
    tags: []  // Assurer que les tags sont inclus dans les options de filtre
  });

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get("/api/products/");
        setProduits(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        setError("Erreur lors de la récupération des produits");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories/");
        setCategories(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories", err);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axios.get("/api/tags/");
        setTags(response.data);  // Mettez à jour l'état des tags
        setFilterOptions(prev => ({
          ...prev,
          tags: response.data,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des tags", error);
      }
    };

    fetchProduits();
    fetchCategories();
    fetchTags();  // Récupérer les tags
  }, []);

  const produitsAffiches = searchResults || produits;

  const filteredProduits = produitsAffiches.filter((prod) => {
    const matchesCategory = selectedCategory ? prod.category === selectedCategory : true;
    const matchesPrice = prod.price >= filterOptions.priceMin && prod.price <= filterOptions.priceMax;
    const matchesCurrency = filterOptions.currencies.includes(prod.currency);

    const matchesTags = filterOptions.selectedTags.length === 0 || filterOptions.selectedTags.some(tag => prod.tags?.includes(tag));

    return matchesCategory && matchesPrice && matchesCurrency && matchesTags;
  });

  const resetFilters = () => {
    setFilterOptions({
      sortBy: "relevance",
      selectedTags: [],
      priceMin: 0,
      priceMax: 10000,
      currencies: ["USD", "CDF"],
      tags: [],
    });
    setSelectedCategory(null);
  };

  return (
    <main className="p-6 pb-24 lg:pb-8 space-y-8">
      <CategorieSelector
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />

      <button
  onClick={() => setIsFilterModalOpen(true)}
  className={`whitespace-nowrap px-4 py-2 border rounded-full 
    ${isFilterModalOpen ? "bg-orange-200" : "bg-orange-50"} 
    border-orange-300 text-orange-700 hover:bg-orange-100 transition duration-200`}
>
  Ouvrir les filtres
</button>
      <FilterModal
        isOpen={isFilterModalOpen}
        setIsOpen={setIsFilterModalOpen}
        tags={tags}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        onApply={() => setIsFilterModalOpen(false)}
        resetFilters={resetFilters}  // Passer la fonction de réinitialisation
      />

      <section>
        <h2 className="text-xl font-semibold text-orange-700 mb-4">
          {searchResults
            ? selectedCategory
              ? `Résultats de recherche dans ${categories.find((cat) => cat.id === selectedCategory)?.name}`
              : `Résultats de recherche`
            : selectedCategory
            ? `Produits populaires dans ${categories.find((cat) => cat.id === selectedCategory)?.name}`
            : "Produits populaires"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProduits.length > 0 ? (
            filteredProduits.slice(0, 20).map((prod) => (
              <Link
                href={`/products/${prod.id}`}
                key={prod.id}
                className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out block active:scale-[0.90]"
              >
                <Image
                  src={prod.product_image || "/default/default.png"}
                  alt={prod.name}
                  width={500}
                  height={500}
                  className="rounded-md w-full h-36 object-cover mb-3"
                />
                <h3 className="text-sm font-semibold text-orange-800 mb-1 truncate">
                  {prod.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {prod.description || "Pas de description..."}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-orange-700">
                    {prod.price} {prod.currency === "USD" ? "$" : prod.currency}
                  </span>
                  <span className="text-blue-600 hover:underline">Voir</span>
                </div>
              </Link>
            ))
          ) : (
            <LoadingMarketplace />
          )}
        </div>
      </section>
    </main>
  );
}