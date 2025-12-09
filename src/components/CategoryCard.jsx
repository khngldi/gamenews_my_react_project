import React from "react";
import { useNavigate } from "react-router-dom";
import { Newspaper, Settings, Trophy, BookOpen, Image, Gamepad2 } from "lucide-react";

const iconsMap = {
    Newspaper,
    Settings,
    Trophy,
    BookOpen,
    Image,
    Gamepad2
};

export default function CategoryCard({ category }) {
    const navigate = useNavigate();
    const IconComponent = iconsMap[category.icon];

    const handleClick = () => {
        navigate(`/category/${encodeURIComponent(category.title)}`);
    };

    return (
        <div
            onClick={handleClick}
            className="group relative bg-card rounded-xl overflow-hidden border border-border
                       hover:border-accent transition-all duration-500
                       hover:shadow-[var(--glow-primary)] p-8 cursor-pointer
                       transform hover:scale-105"
        >
            <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: category.gradient }}
            />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div
                        className="p-4 rounded-lg transition-all duration-300 group-hover:shadow-[var(--glow-primary)]"
                        style={{ background: category.gradient }}
                    >
                        {IconComponent && (
                            <IconComponent className="w-8 h-8 text-white" />
                        )}
                    </div>
                </div>

                <h3 className="group-hover:text-accent transition-colors duration-300">
                    {category.title}
                </h3>

                <p className="text-sm text-muted-foreground mt-2">
                    {category.description}
                </p>
            </div>
        </div>
    );
}
