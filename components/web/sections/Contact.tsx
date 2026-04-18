'use client';

import React, { useState, useEffect } from 'react';
import { Send, ArrowRight, Check } from 'lucide-react';
import Section from '../ui/Section';
import FadeIn from '../ui/FadeIn';
import { publicProfile } from '@/config/data';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
        visible: boolean;
    }>({ type: null, message: '', visible: false });

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (submitStatus.type === 'success' && submitStatus.visible) {
            timer = setTimeout(() => {
                setSubmitStatus((prev) => ({ ...prev, visible: false }));
            }, 3000);

            const cleanupTimer = setTimeout(() => {
                setSubmitStatus({ type: null, message: '', visible: false });
            }, 3300); // additional 300ms for fade out animation

            return () => {
                clearTimeout(timer);
                clearTimeout(cleanupTimer);
            };
        }
    }, [submitStatus.type, submitStatus.visible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '', visible: false });

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Thank you! Your message has been sent successfully.',
                    visible: true,
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(data.error || 'Failed to send message');
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Sorry, something went wrong. Please try again later.',
                visible: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Section id="contact" title="Contact Me">
            <FadeIn>
                <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 md:p-8">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label
                                htmlFor="name"
                                className="text-xs font-bold uppercase text-zinc-500"
                            >
                                Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder={publicProfile.displayName}
                                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:placeholder:text-zinc-600 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="email"
                                className="text-xs font-bold uppercase text-zinc-500"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder={publicProfile.email}
                                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:placeholder:text-zinc-600 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
                            />
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="message"
                                className="text-xs font-bold uppercase text-zinc-500"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Your message ..."
                                className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:placeholder:text-zinc-600 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
                            ></textarea>
                        </div>

                        {submitStatus.visible && (
                            <div
                                className={`rounded-lg p-4 text-sm ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}
                            >
                                {submitStatus.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mt-2 inline-flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                                isSubmitting
                                    ? 'cursor-not-allowed bg-zinc-100 text-zinc-400'
                                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-100 dark:hover:bg-zinc-200'
                            }`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                            {!isSubmitting && <Send size={16} className="ml-2" />}
                        </button>
                    </form>
                </div>
            </FadeIn>
        </Section>
    );
};

export default Contact;
