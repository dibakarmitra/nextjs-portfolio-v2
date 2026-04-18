import {
    Navigation,
    Hero,
    Socials,
    About,
    Skills,
    Projects,
    Notes,
    Experience,
    Education,
    Contact,
} from '@/components/web';
import { getPublicPortfolioData } from '@/config/data';
import { getNotes } from '@/lib/webNotes';

export default async function HomePage() {
    const portfolioData = getPublicPortfolioData();
    const notes = await getNotes();

    return (
        <div className="relative min-h-screen">
            <Navigation />

            <main className="relative z-10 mx-auto max-w-3xl px-6">
                <Hero profile={portfolioData.profile} />
                <Socials socials={portfolioData.profile?.socials} />
                <About bio={portfolioData.profile?.bio} />
                <Skills skills={portfolioData.resume.skills} />
                <Projects projects={portfolioData.resume.projects} />
                <Notes notes={notes} notes_count={notes.length} />
                <Experience experiences={portfolioData.resume.experience} />
                <Education education={portfolioData.resume.education} />
                <Contact />
            </main>
        </div>
    );
}
