import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function PlatformCard({ platform }) {
    if (!platform) return null;

    const bgStyle = (platform.gradient && typeof platform.gradient === 'string' && platform.gradient.includes('gradient'))
        ? { background: platform.gradient }
        : { background: platform.gradient || 'linear-gradient(135deg, #888 0%, #666 100%)' };

    return (
        <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            aria-label={`Открыть ${platform.name}`}
        >
            <div
                className="relative bg-card border-2 border-border rounded-xl p-6 overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[var(--glow-primary)]"
                role="region"
                aria-labelledby={`platform-${platform.name}`}
            >
                <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                    style={bgStyle}
                />

                <div className="relative z-10 flex items-center justify-between gap-4">
                    <div>
                        <h3 id={`platform-${platform.name}`} className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
                            {platform.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {platform.description || 'Перейти на платформу'}
                        </p>
                    </div>

                    <div
                        className="p-2 rounded-lg flex items-center justify-center"
                        style={{
                            ...(bgStyle),
                            minWidth: 44,
                            minHeight: 44,
                        }}
                    >
                        <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>
        </a>
    );
}
