import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FeaturedSlider({ news }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    };

    const currentNews = news[currentIndex];

    return (
        <div className="relative w-full h-[500px] md:h-[500px] rounded-xl overflow-hidden group">
            <div className="absolute inset-0">
                <ImageWithFallback
                    src={currentNews.image}
                    alt={currentNews.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-6 md:p-12">
                <div className="max-w-3xl">
                    <span
                        className="inline-block px-4 py-2 rounded-full mb-4"
                        style={{
                            background: 'var(--neon-primary)',
                            color: 'var(--primary-foreground)',
                            boxShadow: 'var(--glow-primary)',
                        }}
                    >
                        {currentNews.category}
                    </span>

                    <h1 className="text-white mb-4 text-3xl md:text-4xl lg:text-5xl">
                        {currentNews.title}
                    </h1>

                    <p className="text-gray-200 mb-6 text-base md:text-lg">
                        {currentNews.description}
                    </p>

                    {/* Ссылка на категорию */}
                    <Link to={`/category/${encodeURIComponent(currentNews.category)}`}>
                        <Button
                            size="lg"
                            className="transition-all duration-300"
                            style={{
                                background: 'var(--neon-primary)',
                                color: 'var(--primary-foreground)',
                                boxShadow: 'var(--glow-primary)',
                            }}
                        >
                            Подробнее
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Navigation Buttons */}
            <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
                <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
                <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {news.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                            background: index === currentIndex ? 'var(--neon-primary)' : 'rgba(255, 255, 255, 0.5)',
                            boxShadow: index === currentIndex ? 'var(--glow-primary)' : 'none',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
