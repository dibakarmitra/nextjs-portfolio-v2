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
        <div className="min-h-screen relative">
            <Navigation />

            <main className="max-w-3xl mx-auto px-6 relative z-10">
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
