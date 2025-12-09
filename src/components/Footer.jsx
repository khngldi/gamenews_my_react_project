import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export function Footer() {
    return (
        <footer className="bg-card border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="mb-4" style={{ color: 'var(--neon-primary)' }}>О нас</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-muted-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]"
                                >
                                    О проекте
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contacts"
                                    className="text-muted-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]"
                                >
                                    Контакты
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="mb-4" style={{ color: 'var(--neon-primary)' }}>Соцсети</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.instagram.com/khngldi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.youtube.com/@khngldi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]"
                            >
                                <Youtube className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@khngldi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]"
                            >
                                <FaTiktok className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="mb-4" style={{ color: 'var(--neon-primary)' }}>Информация</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/rules"
                                    className="text-muted-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]"
                                >
                                    Правила
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="text-muted-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]"
                                >
                                    Конфиденциальность
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logo and Copyright */}
                    <div>
                        <div
                            className="mb-4"
                            style={{
                                textShadow: 'var(--glow-primary)',
                                color: 'var(--neon-primary)'
                            }}
                        >
                            <span>GameNews</span>
                            <p className="text-sm text-muted-foreground mt-1">by khngldi</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2025 GameNews. Все права защищены.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
