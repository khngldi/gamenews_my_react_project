import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { useAuth } from '../components/AuthContext';

export function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setMessage('Пароли не совпадают!');
            return;
        }

        if (!formData.agreeToTerms) {
            setMessage('Вы должны согласиться с правилами и политикой конфиденциальности');
            return;
        }

        setLoading(true);
        try {
            // Важно: передаем username, а не email
            const result = await register(formData.username, formData.password);

            if (result.success) {
                setMessage('Регистрация прошла успешно!');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    agreeToTerms: false
                });
                navigate('/');
            } else {
                setMessage(`Ошибка: ${result.error}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('Ошибка сети. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-card border-2 border-border rounded-2xl p-8 transition-all duration-300 hover:border-accent hover:shadow-[var(--glow-primary)]">
                    <div className="text-center mb-8">
                        <h1 className="mb-2" style={{ color: 'var(--neon-primary)', textShadow: 'var(--glow-primary)' }}>
                            Регистрация
                        </h1>
                        <p className="text-muted-foreground">Создайте аккаунт GameNews</p>
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

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-12 bg-input-background border-border focus:border-accent transition-all duration-300"
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

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="pl-12 pr-12 bg-input-background border-border focus:border-accent transition-all duration-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id="terms"
                                checked={formData.agreeToTerms}
                                onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: !!checked })}
                            />
                            <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                                Я согласен с{' '}
                                <Link to="/rules" className="hover:text-accent transition-colors" style={{ color: 'var(--neon-primary)' }}>
                                    правилами
                                </Link>{' '}
                                и{' '}
                                <Link to="/privacy" className="hover:text-accent transition-colors" style={{ color: 'var(--neon-primary)' }}>
                                    политикой конфиденциальности
                                </Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full transition-all duration-300"
                            disabled={!formData.agreeToTerms || loading}
                            style={{
                                background: 'var(--neon-primary)',
                                color: 'var(--primary-foreground)',
                                boxShadow: 'var(--glow-primary)',
                            }}
                        >
                            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                        </Button>

                        {message && <p className="text-center text-sm mt-2">{message}</p>}

                        <div className="text-center mt-4">
                            <p className="text-sm text-muted-foreground">
                                Уже есть аккаунт?{' '}
                                <Link
                                    to="/login"
                                    className="hover:text-accent transition-all duration-300 hover:drop-shadow-[var(--glow-primary)]"
                                    style={{ color: 'var(--neon-primary)' }}
                                >
                                    Войти
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
