import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CommentSection } from "../components/CommentSection";
import axios from "axios";

export function NewsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const newsRes = await axios.get(`http://localhost:2000/api/news/${id}`);
                setArticle(newsRes.data);

                const commentsRes = await axios.get(
                    `http://localhost:2000/api/comments?postId=${encodeURIComponent(id)}`
                );
                setComments(
                    Array.isArray(commentsRes.data)
                        ? commentsRes.data.sort(
                            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        : []
                );
            } catch (err) {
                console.error(err);
                setError("Ошибка при загрузке новости или комментариев");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (isLoading)
        return <p className="loading-text !text-black dark:!text-white">Загрузка...</p>;
    if (error)
        return (
            <div className="error-container">
                <h2 className="error-text">{error}</h2>
                <p className="error-sub">Попробуйте позже.</p>
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-12">
            <article className="max-w-4xl mx-auto">
                {/* Кнопка Назад */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 px-6 py-2 rounded-xl border-2 font-bold text-white transition-all duration-300"
                    style={{
                        background: 'var(--neon-primary)',
                        borderColor: 'var(--neon-primary)',
                        boxShadow: 'var(--glow-primary)',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
                        e.currentTarget.style.boxShadow =
                            '0 0 20px var(--neon-primary), 0 0 40px var(--neon-primary)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'var(--neon-primary)';
                        e.currentTarget.style.boxShadow = 'var(--glow-primary)';
                    }}
                >
                    Назад
                </button>

                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                        <span
                            className="px-3 py-1 rounded-full"
                            style={{
                                background: 'var(--neon-primary)',
                                color: 'var(--primary-foreground)',
                                boxShadow: 'var(--glow-primary)',
                            }}
                        >
                            {article.category}
                        </span>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date || "—"}</span>
                        </div>
                    </div>

                    <h1 style={{ color: 'var(--neon-primary)' }}>{article.title}</h1>
                </div>

                <div className="mb-8 rounded-xl overflow-hidden">
                    <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-auto"
                    />
                </div>

                <div
                    className="prose prose-lg max-w-none mb-12"
                    dangerouslySetInnerHTML={{
                        __html: article.content || article.description || "",
                    }}
                    style={{ color: 'var(--foreground)' }}
                />

                <CommentSection comments={comments} postId={id} setComments={setComments} />
            </article>
        </div>
    );
}
