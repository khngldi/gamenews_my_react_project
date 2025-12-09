import React from 'react';
import { Target, Users, Zap, Award } from 'lucide-react';

export function AboutPage() {
    const features = [
        {
            icon: Target,
            title: 'Моя миссия',
            description: 'Показывать то, что сам нахожу интересным и забавным в мире игр'
        },
        {
            icon: Users,
            title: 'Сообщество',
            description: 'Для всех, кто любит игры и хочет иногда посмеяться или узнать что-то новое'
        },
        {
            icon: Zap,
            title: 'Свежие новости',
            description: 'Сразу узнавайте обо всём новом, что я сам нахожу в игровой индустрии'
        },
        {
            icon: Award,
            title: 'Честный контент',
            description: 'Обзоры, заметки и гайды от меня лично, без пафоса и рекламных слов'
        }
    ];


    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1
                        className="mb-6"
                        style={{
                            color: 'var(--neon-primary)',
                            textShadow: 'var(--glow-primary)'
                        }}
                    >
                        О нас
                    </h1>
                    <p className="text-2xl md:text-3xl text-muted-foreground">
                        GameNews by Khngldi – это сайт, где я сам публикую интересные и забавные новости из мира игр!
                    </p>
                </div>

                {/* About Content */}
                <div className="bg-card border border-border rounded-xl p-8 mb-12">
                    <div className="space-y-6 text-muted-foreground">
                        <p>
                            GameNews – это мой маленький игровой уголок в интернете. Здесь я делюсь тем, что сам узнаю о
                            новых играх, обновлениях и всяких интересных штуках из мира компьютерных игр.
                        </p>
                        <p>
                            Сайт появился в 2025 году, когда я понял, что хочу собирать новости, делиться гайдами и
                            просто рассказывать о том, что мне самому кажется крутым или смешным в играх.
                        </p>

                        <p>На сайте вы найдете:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Свежие игровые новости, которые я сам нахожу и публикую</li>
                            <li>Обзоры и забавные заметки по играм, которые я сам играю</li>
                            <li>Интересные факты и рейтинги из мира киберспорта</li>
                            <li>Гайды, советы и личные впечатления от игр</li>
                            <li>Разные игровые арты и скриншоты</li>
                        </ul>

                    </div>
                </div>

                {/* Features */}
                <h2 className="mb-8 text-center" style={{ color: 'var(--neon-primary)' }}>
                    Почему выбирают меня
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent hover:shadow-[var(--glow-primary)]"
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                    style={{
                                        background: 'var(--neon-primary)',
                                        boxShadow: 'var(--glow-primary)'
                                    }}
                                >
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Team Section */}
                <div className="bg-card border border-border rounded-xl p-8">
                    <h2 className="mb-6" style={{ color: 'var(--neon-primary)' }}>
                        Наша команда
                    </h2>

                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            GameNews делаю я один – Khngldi. Все новости, обзоры и статьи – результат моих собственных находок
                            и игрового опыта.
                        </p>

                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Я – основатель, редактор и автор всего контента</li>
                            <li>Я же – дизайнер, который делает сайт красивым</li>
                            <li>Я же – разработчик, который всё это собирает и поддерживает</li>
                            <li>Я же – модератор, следящий за тем, чтобы здесь было весело и интересно</li>
                        </ul>

                        <p className="pt-4">
                            Всё делаю сам, но буду рад, если вы будете читать, комментировать и делиться этим сайтом.
                            Добро пожаловать на GameNews!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
