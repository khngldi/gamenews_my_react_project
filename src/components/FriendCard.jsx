import React from 'react';

export default function FriendCard({ friend, index = 0 }) {
    if (!friend) return null;

    return (
        <a
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-card border-2 border-border rounded-xl p-4 transition-all duration-300 hover:border-accent hover:shadow-[var(--glow-primary)] flex items-center gap-4"
            aria-label={`Открыть профиль ${friend.name}`}
        >
            {/* Нумерация с автоматическим цветом */}
            <span
                className="
                    flex items-center justify-center
                    font-bold text-lg
                    rounded-lg
                    transition-all duration-300
                    text-foreground
                "
                style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                {index + 1}
            </span>

            <div className="flex-1">
                <div className="text-base md:text-lg font-medium text-foreground">
                    {friend.name}
                </div>

                {friend.note && (
                    <div className="text-sm text-muted-foreground">
                        {friend.note}
                    </div>
                )}
            </div>
        </a>
    );
}
