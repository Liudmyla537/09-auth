import type { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
    title: "NoteHub",
    description: "Oops! This page does not exist. Create a new note.",
    openGraph: {
        title: `NoteHub - Page not found`,
        description: `Oops! This page does not exist. Create a new note.`, 
        siteName: "NoteHub",
        url: `https://08-zustand-wheat-omega.vercel.app/`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: `NoteHub - Note sharing`,
                },
            ],
        type: "website"
    }
};

export default function NotFound () {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>
        Sorry, the page you&#39;re looking for doesn&#39;t exist.
      </p>
    </div>
  );
};

