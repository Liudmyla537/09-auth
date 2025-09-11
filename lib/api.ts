import axios from "axios";
import { CreateNote, Note, NoteTag } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams{
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

const headers = { Authorization: `Bearer ${TOKEN}` };

export const fetchNotes = async ({ page, perPage, search, tag }: FetchNotesParams): Promise<FetchNotesResponse> => {
  
  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    headers,
    params: { page, perPage, search, tag },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: Note["id"]) => {
  const res = await axios.get<Note>(`${BASE_URL}/${noteId}`, {headers})
  return res.data
}

export const createNote = async (note: CreateNote): Promise<Note> => {
  const res = await axios.post<Note>(BASE_URL, note, { headers });
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/${id}`, {
    headers,
  });
  return res.data;
};
