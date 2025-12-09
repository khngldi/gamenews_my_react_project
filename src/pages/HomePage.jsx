import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { FeaturedSlider } from "../components/FeaturedSlider";
import NewsCard from "../components/NewsCard";
import "../index.css";
import LoadingNewsPage from "../components/LoadingNewsPage.jsx";

export function HomePage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoryFilter = searchParams.get("category");
    const searchFilter = searchParams.get("search");

    const [news, setNews] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const featuredNews = [
        {
            _id: 1, // Для слайдера можно оставить id статическим
            title: "Мои обзоры игр: честное мнение о самых разных проектах",
            description: "Делюсь своим игровым опытом, рассказываю, что понравилось, а что нет.",
            image: "/src/assets/obzory.png",
            category: "Обзоры игр",
        },
        {
            _id: 2,
            title: "Полезные гайды, которые облегчат вам игру",
            description: "Советы, хитрости и разбор игровых механик, чтобы вы играли легче и быстрее.",
            image: "/src/assets/maxresdefault.jpg",
            category: "Гайды",
        },
        {
            _id: 3,
            title: "Моды, которые я использую — делаю игры интереснее!",
            description: "Подборка модов, которые улучшают графику, геймплей и делают игру веселее.",
            image: "/src/assets/Mods.png",
            category: "Моды",
        },
    ];

    useEffect(() => {
        let api = "http://localhost:2000/api/news";
        if (categoryFilter) api += `?category=${encodeURIComponent(categoryFilter)}`;

        setLoading(true);
        setError(null);

        async function fetchNews() {
            try {
                const response = await axios.get(api);
                setNews(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error(err);
                setError("Ошибка при загрузке новостей. Попробуйте позже.");
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, [categoryFilter, location.search]);

    const processedNews = useMemo(() => {
        let arr = [...news];
        if (searchFilter) {
            const text = searchFilter.toLowerCase();
            arr = arr.filter(
                (n) =>
                    n.title?.toLowerCase().includes(text) ||
                    n.description?.toLowerCase().includes(text)
            );
        }
        return arr;
    }, [news, searchFilter]);

    if (isLoading) {
        return <LoadingNewsPage />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
                <img src="/src/assets/close.png" alt="Ошибка" className="w-24 h-24 mb-4" />
                <h2 className="text-red-500 text-lg font-semibold mb-2">{error}</h2>
                <p className="text-muted-foreground">Попробуйте обновить страницу позже.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-16">
            <section>
                <FeaturedSlider news={featuredNews} />
            </section>

            <section>
                <h2 className="mb-8 text-3xl font-bold" style={{ color: "var(--neon-primary)" }}>
                    {categoryFilter ? `Новости: ${categoryFilter}` : "Все новости"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {processedNews.map((item) => (
                        <NewsCard key={item._id} news={item} />
                    ))}
                </div>
            </section>
        </div>
    );
}