import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CategoryCard from "../components/CategoryCard";
import "../index.css";
import LoadingCategoryPage from "../components/LoadingCategoryPage.jsx";

export function CategoriesPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadCategories() {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get("http://localhost:2000/api/categories");
                setCategories(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error(err);
                setError("Ошибка при загрузке категорий");
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    const handleCategoryClick = (title) => {
        if (!title) return;
        navigate(`/category/${encodeURIComponent(title)}`);
    };

    if (isLoading) {
        return <LoadingCategoryPage />;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-6">Все категории</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <CategoryCard
                        key={cat.id}
                        category={cat}
                        onClick={() => handleCategoryClick(cat.title)}
                    />
                ))}
            </div>
        </div>
    );
}
