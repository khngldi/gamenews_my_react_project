import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export function RulesPage() {
    const sections = [
        {
            icon: CheckCircle,
            title: 'Разрешено',
            color: 'var(--neon-primary)',
            items: [
                'Оставлять комментарии под публикациями',
                'Делиться опытом, советами и модами в комментариях',
                'Уважительно общаться с другими в комментариях'
            ]
        },
        {
            icon: XCircle,
            title: 'Запрещено',
            color: 'var(--neon-destructive)',
            glow: 'var(--glow-destructive)',
            items: [
                'Оскорбления, угрозы или дискриминация в комментариях',
                'Флуд и оффтоп в комментариях',
                'Спам, рекламные ссылки или ссылки на вредоносные сайты в комментариях',
                'Мошеннические действия через комментарии (например, фишинговые ссылки)',
                'Публикация чужого контента без ссылки на источник',
                'Комментарии с насилием, контентом для взрослых или запрещёнными темами'
            ]
        }

    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                         style={{
                             background: 'var(--neon-primary)',
                             boxShadow: 'var(--glow-primary)'
                         }}
                    >
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1
                        className="mb-6"
                        style={{
                            color: 'var(--neon-primary)',
                            textShadow: 'var(--glow-primary)'
                        }}
                    >
                        Правила сайта
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        Я публикую новости, обзоры и моды для игр. Вы можете оставлять комментарии под каждой публикацией.
                    </p>
                </div>

                {/* Introduction */}
                <div className="bg-card border border-border rounded-xl p-8 mb-12">
                    <h2 className="mb-4" style={{ color: 'var(--neon-primary)' }}>
                        Общие положения
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        Добро пожаловать на GameNews by Khngldi! Все публикации создаю я — новости, обзоры и моды для игр.
                        Вы можете оставлять свои комментарии под каждой публикацией.
                        <p>
                            Чтобы всем было комфортно и весело, прошу соблюдать эти простые правила.
                            Нарушения могут привести к предупреждению или блокировке.
                        </p>
                    </div>
                </div>

                {/* Rules Sections */}
                <div className="space-y-8 mb-12">
                    {sections.map((section) => (
                        <div
                            key={section.title}
                            className={`rule-card rounded-xl p-8 transition-all duration-300 ${
                                section.title === "Запрещено" ? "destructive" : ""
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="p-3 rounded-lg"
                                    style={{
                                        background: section.color,
                                        boxShadow: section.glow || 'var(--glow-primary)'
                                    }}
                                >
                                    <section.icon className="w-6 h-6 text-white" />
                                </div>
                                <h2 style={{ color: section.color }}>{section.title}</h2>
                            </div>
                            <ul className="space-y-3">
                                {section.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                            style={{ background: section.color }}
                                        />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


                {/* Additional Rules */}
                <div className="bg-card border border-border rounded-xl p-8 mb-12">
                    <h2 className="mb-6" style={{ color: 'var(--neon-primary)' }}>
                        Дополнительные правила
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-2">1. Комментарии</h3>
                            <p className="text-muted-foreground">
                                Пользователи могут оставлять комментарии. Нарушающие правила комментарии могут быть удалены.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2">2. Авторские права</h3>
                            <p className="text-muted-foreground">
                                Контент на сайте защищен авторским правом. При цитировании — ссылка на GameNews by Khngldi обязательна.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2">3. Ответственность</h3>
                            <p className="text-muted-foreground">
                                Пользователи несут ответственность за свои комментарии. Нарушающие правила комментарии могут быть удалены, а аккаунт — заблокирован.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2">4. Модерация</h3>
                            <p className="text-muted-foreground">
                                Я могу менять правила сайта по мере необходимости. Мои решения являются окончательными.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div className="bg-destructive/10 border-2 border-destructive/50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="mb-2 text-destructive">Важно!</h3>
                            <p className="text-sm text-muted-foreground">
                                За серьёзные нарушения в комментариях (угрозы, запрещённый контент) аккаунт может быть заблокирован навсегда.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
