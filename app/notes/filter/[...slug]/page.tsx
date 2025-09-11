import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({params}:Props):Promise<Metadata> {
  const { slug } = await params
  const descriptions = {
    All: "All notes in one place",
    Work: "Notes for work and projects",
    Todo: "Task lists and plans",
    Personal: "Personal notes and ideas",
    Meeting: "Notes from meetings and discussions",
    Shopping: "Shopping and order lists",
  }

   const description =
    descriptions[slug[0] as keyof typeof descriptions] ||
    "Browse your notes in NoteHub";
  
  return {
    title: `NoteHub - ${slug[0]} notes`,
    description,
    
    openGraph: {
      title: `NoteHub - ${slug[0]} notes`,
      description,
      url: `https://07-routing-nextjs-sable.vercel.app/notes/filter/${slug.join("/")}`,
      siteName: 'NoteHub',
      type: "website",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${slug[0]} notes`,
        },
      ]
      }
  }
}

export default async function NotesPage ({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const tag = slug[0] === "All" ? undefined : (slug[0] as NoteTag);
  
  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes({page: 1, perPage: 12, search: "", tag}),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  )
};



