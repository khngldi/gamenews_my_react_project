import React from 'react';
import { Lock, Eye, Database, Shield } from 'lucide-react';

export function PrivacyPage() {
    const sections = [
        {
            icon: Database,
            title: 'Какие данные мы собираем',
            content: [
                'Имя пользователя и email при регистрации',
                'IP-адрес и данные о браузере для безопасности',
                'Информацию о вашей активности на сайте (например, комментарии)',
                'Cookies для улучшения работы сайта',
                'Данные, которые вы добровольно предоставляете в комментариях'
            ]
        },
        {
            icon: Shield,
            title: 'Как мы используем данные',
            content: [
                'Для обеспечения работы сайта и возможности оставлять комментарии',
                'Для защиты сайта от мошенничества и злоупотреблений',
                'Для отправки важных уведомлений о сервисе',
                'Для аналитики и статистики (в обезличенном виде)'
            ]
        },
        {
            icon: Lock,
            title: 'Как мы защищаем данные',
            content: [
                'Используем шифрование для передачи данных (SSL/TLS)',
                'Храним пароли в зашифрованном виде',
                'Регулярно обновляем системы безопасности',
                'Ограничиваем доступ к персональным данным',
                'Проводим регулярный аудит безопасности'
            ]
        },
        {
            icon: Eye,
            title: 'Ваши права',
            content: [
                'Право на доступ к своим данным, которые вы оставили в комментариях',
                'Право на исправление неточных данных',
                'Право на удаление своих комментариев',
                'Право на ограничение обработки данных',
                'Право на отзыв согласия на обработку данных'
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                        style={{
                            background: 'var(--neon-primary)',
                            boxShadow: 'var(--glow-primary)'
                        }}
                    >
                        <Lock className="w-8 h-8 text-white" />
                    </div>

                    <h1
                        className="mb-6"
                        style={{
                            color: 'var(--neon-primary)',
                            textShadow: 'var(--glow-primary)'
                        }}
                    >
                        Политика конфиденциальности
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground">
                        Мы серьезно относимся к защите ваших персональных данных
                    </p>
                </div>

                {/* Introduction */}
                <div className="bg-card border border-border rounded-xl p-8 mb-12">
                    <h2 className="mb-4" style={{ color: 'var(--neon-primary)' }}>
                        Введение
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            Настоящая Политика конфиденциальности описывает, как GameNews by Khngldi собирает, использует и защищает персональные данные пользователей.
                            Все публикации на сайте создаю я — новости, обзоры и моды для игр. Пользователи могут оставлять комментарии под публикациями.
                        </p>
                        <p>
                            Используя сайт и оставляя комментарии, вы соглашаетесь с условиями данной политики. Мы можем обновлять эту политику время от времени, и изменения вступают в силу с момента публикации.
                        </p>
                        <p className="pt-2">
                            <strong>Дата последнего обновления:</strong> 1 декабря 2025 года
                        </p>
                    </div>
                </div>

                {/* Main Sections */}
                <div className="space-y-8 mb-12">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={section.title}
                                className="bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:border-accent hover:shadow-[var(--glow-primary)]"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="p-3 rounded-lg"
                                        style={{
                                            background: 'var(--neon-primary)',
                                            boxShadow: 'var(--glow-primary)'
                                        }}
                                    >
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 style={{ color: 'var(--neon-primary)' }}>{section.title}</h2>
                                </div>

                                <ul className="space-y-3">
                                    {section.content.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div
                                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                style={{ background: 'var(--neon-primary)' }}
                                            />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
