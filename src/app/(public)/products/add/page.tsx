/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPlus, FaCamera } from "react-icons/fa";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { motion, AnimatePresence } from "framer-motion";

const AddProductPage = () => {
  const router = useRouter();

  const [stores, setStores] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "USD",
    category: "",
    tags: [],
    publish_in_store: false,
    store: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storeRes, catRes, tagRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/mine/", {
            withCredentials: true,
          }),
          axios.get("http://127.0.0.1:8000/api/categories/", {
            withCredentials: true,
          }),
          axios.get("http://127.0.0.1:8000/api/tags/", {
            withCredentials: true,
          }),
        ]);
        setStores(storeRes.data);
        setCategories(catRes.data);
        setTags(tagRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // Validation simple
  if (
    !formData.name.trim() ||
    !formData.description.trim() ||
    !formData.price ||
    !formData.category ||
    formData.tags.length === 0 ||
    (formData.publish_in_store && !formData.store) ||
    !image
  ) {
    setError("Veuillez remplir tous les champs obligatoires avant de soumettre.");
    setTimeout(() => setError(null), 3000);
    return;
  }

  setError(null); // reset error

  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (key === "tags") {
      value.forEach((tagId: string) => data.append("tags", tagId));
    } else {
      data.append(key, value.toString());
    }
  });
  if (image) data.append("product_image", image);

  try {
    await axios.post("http://127.0.0.1:8000/api/products/", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);

    // Réinitialiser les champs du formulaire
    setFormData({
      name: "",
      description: "",
      price: "",
      currency: "USD",
      category: "",
      tags: [],
      publish_in_store: false,
      store: "",
    });
    setImage(null);
    setPreview(null);
    router.refresh(); // Pour rafraîchir la page si nécessaire
  } catch (err) {
    console.error(err);
    setError("Erreur lors de l’ajout du produit.");
  }
};

  const handleTagsChange = (selected: any) => {
    const tagIds = selected.map((tag: any) => tag.id || tag.value);
    setFormData((prev) => ({ ...prev, tags: tagIds }));
  };

  const handleCreateTag = async (inputValue: string) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/tags/",
        { name: inputValue },
        { withCredentials: true }
      );
      const newTag = res.data;
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);

      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.id],
      }));
    } catch (err) {
      console.error("Erreur de création du tag", err);
    }
  };

  const currencyOptions = [
    { value: "CDF", label: "Franc Congolais (FC)" },
    { value: "USD", label: "Dollars (USD)" },
  ];

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const handleCurrencyChange = (selected: any) => {
    setFormData((prev) => ({ ...prev, currency: selected.value }));
  };

  const handleCategoryChange = (selected: any) => {
    setFormData((prev) => ({ ...prev, category: selected.value }));
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-orange-600 hover:text-orange-800 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Retour
      </button>

      <h1 className="text-2xl font-bold mb-6 text-orange-700 flex items-center">
        <FaPlus className="mr-2" />
        Ajouter un produit
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center">
          <label className="relative cursor-pointer w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaCamera className="text-gray-400 text-3xl" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              
            />
          </label>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          className="w-full p-2 border rounded"
          onChange={handleChange}
           
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          onChange={handleChange}
           
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          className="w-full p-2 border rounded"
          onChange={handleChange}
           
        />

        <Select
          placeholder="Sélectionnez une devise"
          options={currencyOptions}
          className="basic-single"
          classNamePrefix="select"
          onChange={handleCurrencyChange}
        />

        <Select
          placeholder="Sélectionnez une catégorie"
          options={categoryOptions}
          className="basic-single"
          classNamePrefix="select"
          onChange={handleCategoryChange}
        />

        <CreatableSelect
          isMulti
          placeholder="Sélectionnez ou créez des tags"
          options={tags.map((tag) => ({
            value: tag.id,
            label: tag.name,
            id: tag.id,
          }))}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleTagsChange}
          onCreateOption={handleCreateTag}
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="publish_in_store"
            onChange={handleChange}
          />
          <span>Publier dans un store</span>
        </label>

        {formData.publish_in_store && (
          <select
            name="store"
            className="w-full p-2 border rounded"
            onChange={handleChange}
             
          >
            <option value="">-- Sélectionner un magasin --</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
        >
          Enregistrer le produit
        </button>
      </form>

      <AnimatePresence>
  {success && (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded shadow-lg z-50"
    >
      Produit ajouté avec succès !
    </motion.div>
  )}
</AnimatePresence>

{!success && (
  <AnimatePresence>
    {error && (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50"
      >
        {error}
      </motion.div>
    )}
  </AnimatePresence>
)}
    </div>
  );
};

export default AddProductPage;