import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({params}:Props): Promise<Metadata> {
  const { id } = await params
  const note = await fetchNoteById(id)
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 100),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 150),
      url: `https://08-zustand-wheat-omega.vercel.app/notes/${id}`,
      siteName: "NoteHub",
      type: 'article',
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
					width: 1200,
					height: 630,
					alt: note.title,
        }
      ]
    }
  }
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;