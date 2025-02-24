"use client";

import "./style.css"
import React from "react";


// const edit = () => {
//     console.log("Edit note card");
// }
//
// const deleteNote = () => {
//     console.log("Delete note card");
// }

const formatDate = (date: number) => {
    const d = new Date(date);
    return `${d.getDate()} ${d.toLocaleString("en-US", {month: "long"})}, ${d.getFullYear()}`;
};

interface NoteCardTypes {
    htmlContent: string,
    dateCreated: number,
    dateModified: number,
    setShowEditor: (elem: React.MouseEvent<HTMLDivElement>) => void,
    setSyncNoteDiv: (elem: HTMLDivElement) => void,
}


export const NoteCard = (
    {
        htmlContent,
        dateCreated,
        dateModified,
        setShowEditor,
        setSyncNoteDiv
    }: NoteCardTypes) => {
    // console.log(htmlContent);
    return (
        <div
            className="group relative bg-gray-800 flex items-start justify-center transition-all duration-300 cursor-pointer overflow-hidden h-[350px] shadow-[0_0_5px_rgba(0,0,0,1)]"
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                setShowEditor(event);
                setSyncNoteDiv(event.currentTarget.querySelector(".note-content") || event.currentTarget);
            }}>
            <div
                className="absolute inset-0 bg-gray-500 bg-opacity-0 transition-opacity duration-700 group-hover:bg-opacity-50">
            </div>
            <div className={"note-content"}>
                {htmlContent}
            </div>
            <div
                className="absolute top-[20%] w-full text-left text-white text-lg px-4 translate-y-10 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                <div className={"note-title mb-3"}>
                    <h1>Title of note</h1>
                </div>
                <hr className={"w-[0px] group-hover:w-[75px] transition-all delay-300 duration-500 ease-in-out"}/>
                <p>Created on: {formatDate(dateCreated)} </p>
                <p>Last modified: {formatDate(dateModified)}</p>
            </div>
        </div>

    )
}