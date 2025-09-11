"use client"

import css from "./NoteForm.module.css";
import { CreateNote, NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useNoteDraftStore from "@/lib/store/noteStore";

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping" ];

interface NoteFormProps {
  onCancel?: () => void;
}

export default function NoteForm({onCancel}: NoteFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value
    })
  }

  const createMutation = useMutation({
    mutationFn: (data: CreateNote) => createNote(data),
    onSuccess: () => {
      toast.success("Note created succesfuly!!!")
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft()
      router.back();
    },
    onError: (error) => {
      console.error("Create error:", error);
      toast.error('Failed to create note')
    },
  });

  async function handleSubmit(formData: FormData) {
    const values: NoteFormValues = {
      title: formData.get("title") as string,
      content: (formData.get("content") as string) || "",
      tag: formData.get("tag") as NoteTag,
    };
    createMutation.mutate(values);
  }

  return (
    <form action={ handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          minLength={3}
          maxLength={50}
          defaultValue={draft?.title} onChange={handleChange}
          className={css.input} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            required
            maxLength={500}
            defaultValue={draft?.content}
            onChange={handleChange}
            className={css.textarea}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag
            <select
              id="tag"
              name="tag"
              defaultValue={draft.tag}
              onChange={handleChange}
              className={css.select}>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel ?? (() => router.back())}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            {createMutation.isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </form>
  );
}