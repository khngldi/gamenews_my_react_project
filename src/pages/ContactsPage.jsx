import React, { useState } from 'react';
import { Mail, Send, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

export function ContactsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form:', formData);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'khanekshakh@gmail.com',
            description: 'Пишите мне напрямую'
        },
        {
            icon: MapPin,
            title: 'Город',
            value: 'Казахстан, Алматы',
            description: 'Я работаю отсюда'
        }
    ];


    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1
                        className="mb-6"
                        style={{
                            color: 'var(--neon-primary)',
                            textShadow: 'var(--glow-primary)'
                        }}
                    >
                        Контакты
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        Свяжитесь со мной — я лично отвечаю на все сообщения!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="mb-6" style={{ color: 'var(--neon-primary)' }}>
                            Напишите мне
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Имя</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Ваше имя"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-input-background border-border focus:border-accent transition-all duration-300"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-input-background border-border focus:border-accent transition-all duration-300"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Тема</Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder="Тема сообщения"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="bg-input-background border-border focus:border-accent transition-all duration-300"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Сообщение</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Ваше сообщение..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="min-h-[150px] bg-input-background border-border focus:border-accent transition-all duration-300"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full transition-all duration-300"
                                style={{
                                    background: 'var(--neon-primary)',
                                    color: 'var(--primary-foreground)',
                                    boxShadow: 'var(--glow-primary)'
                                }}
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Отправить
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="mb-6" style={{ color: 'var(--neon-primary)' }}>
                            Контактная информация
                        </h2>
                        <div className="space-y-6">
                            {contactInfo.map((info) => (
                                <div
                                    key={info.title}
                                    className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent hover:shadow-[var(--glow-primary)]"
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="p-3 rounded-lg flex-shrink-0"
                                            style={{
                                                background: 'var(--neon-primary)',
                                                boxShadow: 'var(--glow-primary)'
                                            }}
                                        >
                                            <info.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="mb-1">{info.title}</h3>
                                            <p className="mb-1">{info.value}</p>
                                            <p className="text-sm text-muted-foreground">{info.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 bg-card border border-border rounded-xl p-6">
                            <h3 className="mb-4" style={{ color: 'var(--neon-primary)' }}>
                                Рабочие часы
                            </h3>
                            <div className="space-y-2 text-muted-foreground">
                                <p>Понедельник — Пятница: 10:00 — 19:00</p>
                                <p>Суббота — Воскресенье: Выходной</p>
                                <p>Я стараюсь отвечать на все письма в течение суток, но иногда могу задержаться )</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
