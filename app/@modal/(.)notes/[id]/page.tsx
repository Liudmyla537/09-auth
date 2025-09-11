import { fetchNoteById } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NotePreviewModal from "@/app/@modal/(.)notes/[id]/NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview ({ params }: Props){
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewModal />
    </HydrationBoundary>
  );
};
