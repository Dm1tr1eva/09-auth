import { cookies } from "next/headers";
import { fetchNoteById } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreviewPage = async ({ params }: Props) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id, cookieStore.toString()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default NotePreviewPage;
