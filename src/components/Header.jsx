import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from './AuthContext';

export function Header() {
    const { theme, toggleTheme } = useTheme();
    const { user, isAuthenticated, logout } = useAuth();

    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [searchText, setSearchText] = useState(searchQuery);

    const isSearchPage =
        location.pathname === '/' ||
        /^\/category\/[^/]+$/.test(location.pathname);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);

        if (searchText.trim()) {
            params.set('search', searchText.trim());
        } else {
            params.delete('search');
        }

        setSearchParams(params, { replace: true });
    };

    useEffect(() => {
        setSearchText(searchQuery);
    }, [searchQuery]);

    return (
        <header className="sticky top-0 z-50 w-full bg-card border-b border-border backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 transition-all duration-300"
                        style={{ textShadow: `var(--glow-primary)`, color: 'var(--neon-primary)' }}
                    >
                        <span className="text-xl md:text-2xl font-black">GameNews by khngldi</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]">Главная</Link>
                        <Link to="/categories" className="text-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]">Категории</Link>
                        <Link to="/khngldi" className="text-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]">Khngldi</Link>
                    </nav>

                    {/* Desktop Search */}
                    {isSearchPage && (
                        <div className="flex-1 max-w-md mx-6">
                            <form onSubmit={handleSearch} className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Поиск..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="pl-10 bg-input-background border-border focus:border-accent transition-all duration-300 focus:drop-shadow-[var(--glow-primary)]"
                                />
                            </form>
                        </div>
                    )}


                    {/* Right Actions */}
                    <div className="flex items-center space-x-3">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5" style={{ color: 'var(--neon-primary)' }} />
                            ) : (
                                <Moon className="w-5 h-5" style={{ color: 'var(--neon-primary)' }} />
                            )}
                        </Button>

                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center space-x-2">
                                <span className="text-sm text-foreground">{user?.username}</span>
                                <Button
                                    variant="outline"
                                    onClick={logout}
                                    className="border-2 transition-all duration-300 hover:drop-shadow-[var(--glow-primary)] hover:border-accent"
                                >
                                    Выйти
                                </Button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-2">
                                <Link to="/login">
                                    <Button
                                        variant="outline"
                                        className="border-2 transition-all duration-300 hover:drop-shadow-[var(--glow-primary)] hover:border-accent"
                                    >
                                        Вход
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button
                                        className="transition-all duration-300"
                                        style={{ background: 'var(--neon-primary)', boxShadow: 'var(--glow-primary)' }}
                                    >
                                        Регистрация
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <nav className="flex flex-col space-y-4">
                            <Link to="/" className="text-foreground hover:text-accent transition-all duration-300 py-2" onClick={() => setMenuOpen(false)}>Главная</Link>
                            <Link to="/categories" className="text-foreground hover:text-accent transition-all duration-300 py-2" onClick={() => setMenuOpen(false)}>Категории</Link>
                            <Link to="/khngldi" className="text-foreground hover:text-accent transition-all duration-300 py-2" onClick={() => setMenuOpen(false)}>Khngldi</Link>

                            {/* Mobile Search */}
                            {isSearchPage && (
                                <form onSubmit={handleSearch} className="relative pt-2">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Поиск новостей..."
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        className="pl-10 bg-input-background focus:border-accent transition-all duration-300 focus:drop-shadow-[var(--glow-primary)]"
                                        style={{ color: 'var(--foreground)' }}
                                    />
                                </form>
                            )}

                            {/* Mobile Auth */}
                            {isAuthenticated ? (
                                <div className="flex flex-col space-y-2 pt-2">
                                    <span className="text-sm text-foreground">{user?.username}</span>
                                    <Button onClick={logout} className="w-full border-2">Выйти</Button>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-2 pt-2">
                                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">Вход</Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setMenuOpen(false)}>
                                        <Button
                                            className="w-full"
                                            style={{ background: 'var(--neon-primary)', boxShadow: 'var(--glow-primary)' }}
                                        >
                                            Регистрация
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
