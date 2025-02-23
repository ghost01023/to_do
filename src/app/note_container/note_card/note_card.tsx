"use client";

import "./style.css"
import React from "react";

interface NoteCardTypes {
    htmlContent: string,
    setShowEditor: (elem: React.MouseEvent<HTMLDivElement>) => void,
    setSyncNoteDiv: (elem: HTMLDivElement) => void,
}

export const NoteCard = (
    {
        htmlContent,
        setShowEditor,
        setSyncNoteDiv
    }: NoteCardTypes) => {
  console.log(htmlContent);
    return(
    <div
        className={"note-card duration-300 ease-in-out hover:p-7 hover:m-3 bg-slate-700/75 rounded-md hover:bg-slate-700/65 hover:cursor-pointer p-5 text-white"}
        onClick={(elem) => {setShowEditor(elem); setSyncNoteDiv(elem.currentTarget)}}
    ><p
        className={"note-status"}
    ><span
        className="inline-flex items-baseline">
    </span>
        In Progress</p>
        <p
            className={"note-heading"}
        >Title of Note</p>
        <div className={"note-content max-h-60"}>
        {htmlContent}
        </div>
    </div>
    )
}