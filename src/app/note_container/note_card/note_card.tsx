"use client";

import "./style.css"
import Image from "next/image";
// import { TaskCheckBox } from "../task_check_box/task_check_box";
// const noteStatusSpans = [
//     "hello"
// ];

import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Italic from "@tiptap/extension-italic"
import Bold from "@tiptap/extension-bold"
import Strike from "@tiptap/extension-strike"


let GlobalObserver: MutationObserver;
let GlobalClone: HTMLDivElement;

const monitorMutation = (event: React.MouseEvent<HTMLDivElement>) => {
  const original = event.currentTarget;
  const parentElement = original.parentElement;
  console.log("Will start monitoring mutation");
  if (original) {
    if (GlobalObserver) {
  GlobalObserver.disconnect();
  GlobalClone.remove();
}
const clone = original.cloneNode(true);
GlobalClone = clone;
// Style Global clone to increase size, get to center of screen horiontally and vertically
// Also make it a transaition
// Sync changes between clone and original
const observer = new MutationObserver(() => {
  original.innerHTML = clone.innerHTML;
});
GlobalObserver = observer;
observer.observe(clone, { subtree: true, characterData: true, childList: true });
if (parentElement) {
  GlobalClone.classList.add("note-clone");
parentElement.appendChild(GlobalClone);
new Editor({
  element: GlobalClone,
  extensions: [Document, Paragraph, Text, Italic, Bold, Strike],
})
}
}
}

const handleNoteCardClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const eventTarget = event.currentTarget;
    if (eventTarget.classList.contains("img-card-active")) {
        eventTarget.classList.remove("img-card-active");
        return;
    }
    console.log(eventTarget);
    console.log(eventTarget.classList);
    eventTarget.classList.add("img-card-active");
    console.log(eventTarget.classList);
    const parentElement = eventTarget.parentElement;
    console.log("Clicked non-active button");
    if (parentElement) {
    Array.from(parentElement.children).forEach((child) => {
    // console.log(child);
    if (child !== eventTarget && child.classList.contains("img-card-active")) {
        child.classList.remove("img-card-active");
        }
    });
    }
}

interface NoteCardTypes {
    imgLink: string
}

export const NoteCard = ({imgLink}: NoteCardTypes) => {
  console.log(imgLink);
    return(
    <div className={"note-card"} onClick={monitorMutation}>
        <p className={"note-status"}><span className="inline-flex items-baseline">
            </span>In Progress</p>
        <p className={"note-heading"}>Title of Note</p>
        <p>Content of note</p>
        <p>Content of note</p>
        <p>Content of note</p>
        <p>Content of note</p>
        <p>Content of note</p>
        {/* <TaskCheckBox></TaskCheckBox> */}
    </div>
    )
}