
import type { Note } from "@/types/note";
import type { FetchNotesResponse } from "./api";
import api from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";

interface fetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

function getHeaders(cookieString?: string): Record<string, string> {
  return cookieString ? { Cookie: cookieString } : {};
}

export async function fetchNotes(
  params: fetchNotesParams,
  cookieString?: string,
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page: params.page,
      perPage: params.perPage,
      ...(params.tag && params.tag !== "all" && { tag: params.tag }),
      ...(params.search && { search: params.search }),
    },
    headers: getHeaders(cookieString),
  });

  return response.data;
}

export async function fetchNoteById(
  noteId: string,
  cookieString?: string,
): Promise<Note> {
  const response = await api.get<Note>(`/notes/${noteId}`, {
    headers: getHeaders(cookieString),
  });
  return response.data;
}

export async function getMe(): Promise<User> {
 const cookieStore = await cookies();
 const { data } = await api.get("/users/me", {
   headers: {
     Cookie: cookieStore.toString(),
   },
 });
 return data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const response = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
}
