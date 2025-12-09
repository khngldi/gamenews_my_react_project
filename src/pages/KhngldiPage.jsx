import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import steamImg from '../assets/steam.jpg';
import xboxImg from '../assets/xbox.jpg';
import PlatformCard from '../components/PlatformCard';
import FriendCard from '../components/FriendCard';
import axios from 'axios';

export function KhngldiPage() {
    const { theme } = useTheme();
    const themeImg = theme === 'dark' ? steamImg : xboxImg;

    const [platforms, setPlatforms] = useState([]);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const [platformsRes, friendsRes] = await Promise.all([
                    axios.get('http://localhost:2000/api/platforms'),
                    axios.get('http://localhost:2000/api/friends'),
                ]);


                setPlatforms(Array.isArray(platformsRes.data) ? platformsRes.data : []);
                setFriends(Array.isArray(friendsRes.data) ? friendsRes.data : []);
            } catch (err) {
                console.error(err);
                setError('Ошибка при загрузке данных. Проверь мок-сервер.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <div className="text-2xl font-bold">Загрузка...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
                <div className="text-red-500 font-bold">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <img
                        src={themeImg}
                        alt="Khngldi"
                        className="rounded-full border-2 border-neon-primary transition-all duration-700 ease-in-out mx-auto"
                        style={{ width: '12rem', height: '12rem', objectFit: 'cover' }}
                    />
                    <h1 className="text-4xl md:text-5xl mt-6 mb-2" style={{ color: 'var(--neon-primary)', textShadow: 'var(--glow-primary)' }}>
                        Khngldi
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Привет! Я просто обычный геймер, никакой про и не мастер, играю где придётся — Tekken, CS2, Minecraft и всё, что под руку попадёт. Иногда ломаю клавиатуру от злости, иногда радуюсь, когда что-то выходит, выигрываю или хотя бы попадаю в противника раз за матч.
                    </p>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
                        На этом сайте буду делиться своими находками, смешными моментами и свежими новостями из мира игр — для тех, кто хочет быть в курсе событий, но не заморачивается на рейтинг и топы. Короче, место для фана и мемов из игр!
                    </p>
                </div>

                {/* Platforms */}
                <section className="mb-16">
                    <h2 className="text-center mb-6" style={{ color: 'var(--neon-primary)' }}>Мои платформы</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {platforms.length > 0 ? (
                            platforms.map(p => <PlatformCard key={p.name} platform={p} />)
                        ) : (
                            <div className="text-center text-muted-foreground">Платформы не найдены</div>
                        )}
                    </div>
                </section>

                {/* About */}
                <section className="mb-16 bg-card border border-border rounded-xl p-6">
                    <h3 className="mb-4" style={{ color: 'var(--neon-primary)' }}>О себе</h3>
                    <div className="space-y-4 text-muted-foreground">
                        <p>Моя игровая «карьера» выглядит примерно так:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>CS2 — стреляю как могу, иногда даже попадаю в противников (любимое оружие: Zeus)</li>
                            <li>Minecraft — строю дома, исследую моды и ломаю свои же творения (имею лицензионную версию)</li>
                            <li>Tekken — играю онлайн в 7-ю часть, но у меня ещё есть 6, TT2 (через RPCS3) и 8 часть с торрента</li>
                            <li>Dying Light — моя самая любимая игра, надо бы сыграть в The Beast</li>
                            <li>Mortal Kombat — играю за Скорпиона, Синдел и Ермака, но побед меньше, чем поражений</li>
                            <li>В других играх — просто кайфую от процесса (иногда через торрент, иногда из библиотеки Steam)</li>
                        </ul>
                        <p>На этом сайте я публикую игровые новости, которые сам узнаю, делюсь интересным и забавным!</p>
                    </div>
                </section>

                {/* Friends */}
                <section className="mb-16">
                    <h2 className="text-center mb-6" style={{ color: 'var(--neon-primary)' }}>Мои друзья</h2>
                    <div className="space-y-4">
                        {friends.length > 0 ? friends.map((f, i) => <FriendCard key={f.id} friend={f} index={i} />)
                            : <div className="text-center text-muted-foreground">Друзья не найдены</div>}
                    </div>
                </section>
            </div>
        </div>
    );
}
