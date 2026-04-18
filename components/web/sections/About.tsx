import React from 'react';
import Section from '../ui/Section';
import FadeIn from '../ui/FadeIn';
import { publicProfile } from '@/config/data';

interface AboutProps {
    bio?: string;
}

const About: React.FC<AboutProps> = ({ bio }) => {
    const content = bio || publicProfile.bio;

    return (
        <Section id="about" title="About">
            <FadeIn>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm space-y-4 font-mono">
                    <p>{content}</p>
                    <p>
                        Besides coding, I enjoy writing tech blogs, watching anime, and playing
                        games. I like learning new things and always try to turn ideas into real web
                        apps.
                    </p>
                    <p>Let's connect and build something awesome!</p>
                </div>
            </FadeIn>
        </Section>
    );
};

export default About;
