import api from "./api";
import type { Note } from "@/types/note";
import type { CreateNoteRequest, FetchNotesResponse } from "../api";
import type { User } from "@/types/user";

interface fetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export async function fetchNotes(
  params: fetchNotesParams,
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page: params.page,
      perPage: params.perPage,
      ...(params.tag && params.tag !== "all" && { tag: params.tag }),
      ...(params.search && { search: params.search }),
    },
  });

  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function createNote(noteData: CreateNoteRequest): Promise<Note> {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function register(data: RegisterRequest) {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: LoginRequest) {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
}

export async function logout(): Promise<void> {
  const response = await api.post("/auth/logout");
  return response.data;
}

export async function checkSession() {
  const response = await api.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
}

export async function getMe() {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateMe(data: Record<string, unknown>) {
  const response = await api.patch("/users/me", data);
  return response.data;
}
