import React, { useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import NewsCard from "../components/NewsCard";
import LoadingNewsPage from "../components/LoadingNewsPage.jsx";

export function CategoryNewsPage() {
    const { category } = useParams();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const searchFilter = searchParams.get("search");

    const [news, setNews] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadNews() {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(`http://localhost:2000/api/news?category=${encodeURIComponent(category)}`);
                if (Array.isArray(res.data)) {
                    setNews(res.data.filter(n => n._id));
                } else {
                    setNews([]);
                }
            } catch (err) {
                console.error(err);
                setError("Ошибка при загрузке новостей");
            } finally {
                setLoading(false);
            }
        }

        loadNews();
    }, [category]);

    const filteredNews = useMemo(() => {
        if (!searchFilter) return news;

        const text = searchFilter.toLowerCase();
        return news.filter(
            n =>
                n.title?.toLowerCase().includes(text) ||
                n.description?.toLowerCase().includes(text)
        );
    }, [news, searchFilter]);

    if (isLoading) return <LoadingNewsPage />;

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--neon-primary)" }}>
                {category}
            </h2>

            {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map(n => (
                        <NewsCard key={n._id} news={n} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground col-span-full">
                    Новостей по категории "{category}" {searchFilter ? `по запросу "${searchFilter}"` : ""} пока нет.
                </p>
            )}
        </div>
    );
}
