"use client"

import { useState } from "react";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery,} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import { NoteTag } from "@/types/note";
import Link from "next/link";

interface Props{
  tag?: NoteTag;
}

export default function NotesClient({tag}: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const perPage = 12;

  const { data } = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes({ page, perPage, search, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={(selected) => setPage(selected + 1)}
            forcePage={page - 1}
          />
        )}

        {<Link className={css.button} href={'/notes/action/create'}>
        Create note +</Link>}
      </header>

      {data && data.notes.length >= 1 && <NoteList notes={data.notes} />}
    </div>
  );
}
