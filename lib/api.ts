import type { Note } from "@/types/note";

export const AVAILABLE_TAGS = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;
export type Tag = (typeof AVAILABLE_TAGS)[number];

export function isValidTag(tag: string): tag is Tag {
  return AVAILABLE_TAGS.includes(tag as Tag);
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNoteRequest = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};
