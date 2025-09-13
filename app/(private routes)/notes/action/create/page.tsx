import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: "Create Note",
  description: "Create a new note and save it as a draft.",
  openGraph: {
    title: "Create Note",
    description: "Create a new note and save it as a draft.",
    url: "https://08-zustand-wheat-omega.vercel.app/notes/action/create",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "Create Note"
      },
    ],
  },
};

const CreateNotePage = () => {
  return (
    <div>
      Create Note Page - Form will go here
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
          {<NoteForm />}
        </div>
      </main>
    </div>
  );
};

export default CreateNotePage;