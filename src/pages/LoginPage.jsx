import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../components/AuthContext';

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const result = await login(formData.username, formData.password);

        if (result.success) {
            setMessage('Успешный вход!');
            navigate('/');
        } else {
            setMessage(`Ошибка: ${result.error}`);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-card border-2 border-border rounded-2xl p-8 transition-all duration-300 hover:border-accent hover:shadow-[var(--glow-primary)]">
                    <div className="text-center mb-8">
                        <h1 className="mb-2" style={{ color: 'var(--neon-primary)', textShadow: 'var(--glow-primary)' }}>
                            Вход
                        </h1>
                        <p className="text-muted-foreground">Войдите в свой аккаунт GameNews</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username">Имя пользователя</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="pl-12 bg-input-background border-border focus:border-accent transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Пароль</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="pl-12 pr-12 bg-input-background border-border focus:border-accent transition-all duration-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]">
                                Забыли пароль?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full transition-all duration-300"
                            style={{ background: 'var(--neon-primary)', color: 'var(--primary-foreground)', boxShadow: 'var(--glow-primary)' }}
                            disabled={loading}
                        >
                            {loading ? 'Загрузка...' : 'Войти'}
                        </Button>

                        {message && <p className="text-center text-sm mt-2 text-red-500">{message}</p>}

                        <div className="text-center mt-4">
                            <p className="text-sm text-muted-foreground">
                                Нет аккаунта?{' '}
                                <Link to="/register" className="hover:text-accent transition-all duration-300" style={{ color: 'var(--neon-primary)' }}>
                                    Зарегистрироваться
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
