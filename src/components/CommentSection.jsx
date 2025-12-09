import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import axios from 'axios';

export function CommentSection({ comments, postId, setComments, user }) {
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            setSubmitMessage('Комментарий не может быть пустым');
            return;
        }

        setSubmitting(true);
        setSubmitMessage('Отправка комментария...');

        try {
            const response = await axios.post('http://localhost:2000/api/comments', {
                postId,
                text: newComment,
                author: user?.username || 'Аноним',
                createdAt: new Date().toISOString(),
            });

            if (response.status === 200 || response.status === 201) {
                setComments(prev => [response.data, ...prev]);
                setNewComment('');
                setSubmitMessage('Комментарий успешно отправлен!');
            } else {
                setSubmitMessage('Ошибка при отправке комментария');
            }
        } catch (err) {
            console.error(err);
            setSubmitMessage('Ошибка при отправке комментария');
        } finally {
            setSubmitting(false);
            setTimeout(() => setSubmitMessage(''), 4000);
        }
    };

    return (
        <div className="space-y-6">
            <h3 style={{ color: 'var(--neon-primary)' }}>
                Комментарии ({comments.length})
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                    placeholder="Оставьте ваш комментарий..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="min-h-[100px] bg-input-background border-border focus:border-accent transition-all duration-300"
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="transition-all duration-300"
                    style={{
                        background: 'var(--neon-primary)',
                        color: 'var(--primary-foreground)',
                        boxShadow: 'var(--glow-primary)',
                    }}
                >
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                </Button>
            </form>

            {submitMessage && <p className="comment-message">{submitMessage}</p>}

            <div className="space-y-4">
                {comments.map(comment => (
                    <div
                        key={comment._id}
                        className="bg-card border border-border rounded-lg p-4 transition-all duration-300 hover:border-accent"
                    >
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarFallback>{comment.author ? comment.author[0] : 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm">{comment.author || 'Аноним'}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(comment.createdAt).toLocaleString('ru-RU')}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{comment.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
