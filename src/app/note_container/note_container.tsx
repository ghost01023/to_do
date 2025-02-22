"use client";

import { NoteCard } from "./note_card/note_card"

import { Note } from "../page";

interface NoteContainerProps {
  noteData: Note[],
  setShowEditor: (elem: React.MouseEvent<HTMLDivElement>) => void,
  setSyncNoteDiv: (elem: HTMLDivElement) => void
}

export default function NoteContainer({noteData, setShowEditor, setSyncNoteDiv}:NoteContainerProps) {
  let frontRunnerMonth = 0;
  let frontRunnerYear = 0;
    return(
    <section className="note-container">
      {
        noteData.map((noteObject, ind) => {
        const date = new Date(noteObject.dateCreated * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        let newYear = false;
        let newMonth = false;

      if (year !== frontRunnerYear) {
        frontRunnerYear = year;
        newYear = true;
      }
      if (month !== frontRunnerMonth) {
        frontRunnerMonth = month;
        newMonth = true;
      }
        return (
          (newYear && newMonth) ? <>
          <p className="text-red-400">New Year {frontRunnerYear}</p>
          <p className="text-blue-600">New Month {frontRunnerMonth}</p>
          </> : newYear ? <p className="text-red-400">New Year {frontRunnerYear}</p> : newMonth ? <p className="text-blue-600">New Month {frontRunnerMonth}</p> : 
          <NoteCard setShowEditor={setShowEditor} setSyncNoteDiv={setSyncNoteDiv} htmlContent={noteObject.content} key={ind}></NoteCard>
        )})
      }
    </section>)
}