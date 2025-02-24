"use client";

import { NoteCard } from "@/app/components/note_card/note_card"

import { Note } from "@/types/component_types";
import React from "react";

interface NoteContainerProps {
  noteData: Note[],
  setShowEditor: (elem: React.MouseEvent<HTMLElement>) => void,
  setSyncNoteDiv: (elem: HTMLDivElement) => void
}

export default function NoteContainer({noteData, setShowEditor, setSyncNoteDiv}:NoteContainerProps) {
  let frontRunnerMonth = 0;
  let frontRunnerYear = 0;
    return(
    <section className="flex-1 h-full bg-gray-300 bg-opacity-50 overflow-y-auto p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {
        noteData.map((noteObject) => {
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
          (newYear && newMonth) ?
              <div key={noteObject.id}>
              <p key={noteObject.id + "year"} className="text-red-400">New Year {frontRunnerYear}</p>
              <p key={noteObject.id + "month"} className="text-blue-600">New Month {frontRunnerMonth}</p>
              </div> :
              newYear ?
                  <p key={noteObject.id + "year"} className="text-red-400">New Year {frontRunnerYear}</p> :
                  newMonth ?
                      <p key={noteObject.id + "month"} className="text-blue-600">New Month {frontRunnerMonth}</p> :
              <NoteCard
                  key={noteObject.id}
                  setShowEditor={setShowEditor}
                  setSyncNoteDiv={setSyncNoteDiv}
                  dateCreated={noteObject.dateCreated}
                  dateModified={noteObject.dateModified}
                  htmlContent={noteObject.content}
              ></NoteCard>
        )})
      }
    </section>)
}