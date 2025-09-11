"use client"

import { NoteTag } from "@/types/note";
import css from "./TagsMenu.module.css"
import { useState } from "react";
import Link from "next/link";

const tags:NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle}>Notes ▾</button>
            {isOpen && (
                <ul className={css.menuList}>
                    <li className={css.menuItem}>
                        <Link href={`/notes/filter/All`} className={css.menuLink} onClick={toggle}>
                            All Notes
                        </Link>
                    </li>
                    {tags.map((tag) => (
                        <li key={tag} className={css.menuItem} >
                            <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggle}>{ tag}</Link>
                        </li>
                    ))}
            </ul>
            )}
        </div>
    )
}