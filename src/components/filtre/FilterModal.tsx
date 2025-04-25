// components/filgtre/FilterModal.tsx
"use client";
import { Dispatch, SetStateAction } from "react";

type FilterOptions = {
  sortBy: "relevance" | "recent";
  selectedTags: number[];
  priceMin: number;
  priceMax: number;
  currencies: string[];
};

type Tag = {
  id: number;
  name: string;
};

export default function FilterModal({
  isOpen,
  setIsOpen,
  tags,
  filterOptions,
  setFilterOptions,
  onApply,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  tags: Tag[];
  filterOptions: FilterOptions;
  setFilterOptions: Dispatch<SetStateAction<FilterOptions>>;
  onApply: () => void;
}) {
  if (!isOpen) return null;


  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold text-orange-700">Filtres</h3>

        {/* Trier */}
        <div>
          <label className="block mb-1 font-medium">Trier par</label>
          <select
            value={filterOptions.sortBy}
            onChange={(e) =>
              setFilterOptions((prev) => ({ ...prev, sortBy: e.target.value as "relevance" | "recent" }))
            }
            className="w-full border rounded p-2"
          >
            <option value="relevance">Le plus pertinent</option>
            <option value="recent">Le plus récent</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() =>
                  setFilterOptions((prev) => ({
                    ...prev,
                    selectedTags: prev.selectedTags.includes(tag.id)
                      ? prev.selectedTags.filter((id) => id !== tag.id)
                      : [...prev.selectedTags, tag.id],
                  }))
                }
                className={`border px-2 py-1 rounded-full ${
                  filterOptions.selectedTags.includes(tag.id)
                    ? "bg-orange-600 text-white"
                    : "text-gray-700"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Prix */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Prix min"
            value={filterOptions.priceMin}
            onChange={(e) =>
              setFilterOptions((prev) => ({ ...prev, priceMin: Number(e.target.value) }))
            }
            className="border rounded p-2 w-full"
          />
          <input
            type="number"
            placeholder="Prix max"
            value={filterOptions.priceMax}
            onChange={(e) =>
              setFilterOptions((prev) => ({ ...prev, priceMax: Number(e.target.value) }))
            }
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Devise */}
        <div>
          <label className="block mb-1 font-medium">Devise</label>
          <div className="flex gap-3">
            {["USD", "CDF"].map((curr) => (
              <label key={curr} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filterOptions.currencies.includes(curr)}
                  onChange={() =>
                    setFilterOptions((prev) => ({
                      ...prev,
                      currencies: prev.currencies.includes(curr)
                        ? prev.currencies.filter((c) => c !== curr)
                        : [...prev.currencies, curr],
                    }))
                  }
                />
                {curr}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => {
              setIsOpen(false);
              onApply();
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded"
          >
            Appliquer
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}