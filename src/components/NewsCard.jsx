import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import "../index.css";

export default function NewsCard({ news }) {
    if (!news || !news.id) return null;

    const { id, title, category, date, description, image } = news;

    return (
        <Link to={`/news/${id}`} className="news-card group">
            <div className="relative overflow-hidden aspect-video rounded-lg">
                <ImageWithFallback
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                    <span
                        className="px-3 py-1 rounded-full text-sm backdrop-blur-sm"
                        style={{
                            background: 'var(--neon-primary)',
                            color: 'var(--primary-foreground)',
                            boxShadow: 'var(--glow-primary)',
                        }}
                    >
                        {category}
                    </span>
                </div>
            </div>

            <div className="p-4 news-content">
                <h3 className="news-title line-clamp-2 group-hover:text-accent transition-colors duration-300">
                    {title || "Без названия"}
                </h3>

                <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">
                    {description || "Описание отсутствует"}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{date || "Дата неизвестна"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        <span>{category || "Категория отсутствует"}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
