"use client";

// PREDEFINED
import React, { useState, useEffect } from "react";

// USER DEFINED
import { TipTapEditor } from "./components/tiptap/tip-tap";
import NoteContainer from "./note_container/note_container";
import NewNoteButton from "./components/new_note_button/new_note_button";
import FilterMenu from "./components/filter_menu/filter_menu";
import Header from "@/app/components/header/header";

let noteContent = "";

export interface Note {
  id: number;
  dateCreated: number;
  dateModified: number;
  content: string;
}

export default function Home() {
  const getNoteData = () => {
  return [{"id":1730559100,"dateCreated":1730559100,"dateModified":1730559115,"content":"Content for note with dateCreated = 1730559100"},{"id":1730644610,"dateCreated":1730644610,"dateModified":1730644625,"content":"Content for note with dateCreated = 1730644610"},{"id":1731993480,"dateCreated":1731993480,"dateModified":1731993495,"content":"Content for note with dateCreated = 1731993480"},{"id":1732635246,"dateCreated":1732635246,"dateModified":1732635261,"content":"Content for note with dateCreated = 1732635246"},{"id":1732876255,"dateCreated":1732876255,"dateModified":1732876270,"content":"Content for note with dateCreated = 1732876255"},{"id":1734017721,"dateCreated":1734017721,"dateModified":1734017736,"content":"Content for note with dateCreated = 1734017721"},{"id":1734525159,"dateCreated":1734525159,"dateModified":1734525174,"content":"Content for note with dateCreated = 1734525159"},{"id":1734891617,"dateCreated":1734891617,"dateModified":1734891632,"content":"Content for note with dateCreated = 1734891617"},{"id":1735041689,"dateCreated":1735041689,"dateModified":1735041704,"content":"Content for note with dateCreated = 1735041689"},{"id":1735641839,"dateCreated":1735641839,"dateModified":1735641854,"content":"Content for note with dateCreated = 1735641839"}];
}
  
  const [noteData, setNoteData] = useState<Note[]>([]);
  const [sortedNoteData, setSortedNoteData] = useState<Note[]>([]);
  const [filteredNoteData, setFilteredNoteData] = useState<Note[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [syncNoteDiv, setSyncNoteDiv] = useState<HTMLDivElement>();
  const [newNoteButton, setNewNoteButton] = useState(!showEditor);
  const [createNewNote, setCreateNewNote] = useState(false);

  // CLOSED WHEN A USER EITHER PRESSED [CLOSE] OR TYPES [CTRL+ALT+X] WHEN EDITOR IS OPEN
  const toggleEditor = (elem: React.MouseEvent<HTMLDivElement>) => {
    //if editor is already open, close it
    // also, extract heading, progress and textContent separately from target element
    noteContent = elem?.currentTarget?.querySelector(".note-content")?.innerHTML || "";
    setShowEditor(!showEditor);
  }

  // WHENEVER EDITOR IS SHOWS, NEW_NOTE_BUTTON IS HIDDEN AND THE OPPOSITE WHEN IT'S HIDDEN
  useEffect(() => {
  setNewNoteButton(!showEditor);
}, [showEditor]); // Runs whenever `alive` updates

  // RUN ONLY ONCE WHEN FETCHING DATA
  useEffect(() => {
    setNoteData([...getNoteData()])
  }, []);

  // RUNS WHENEVER NOTE_DATA IS MODIFIED
  useEffect(() => {
    //SET SORT CONDITION HERE (data, percentage etc.)
    setSortedNoteData([...noteData].sort((a, b) => b.dateCreated - a.dateCreated));
  }, [noteData]);

  // RUNS WHENEVER SORTED_NOTE_DATA IS RE-SORTED VIA DIFFERENT PARAMETERS
  useEffect(() => {
    //SET FILTRATION PARAMETER(s) HERE
    setFilteredNoteData(sortedNoteData.filter((note) => note.dateCreated % 1 === 0));
  }, [sortedNoteData]);

  // IMPLEMENT AUTH-0 LOGIN, SIGNUP HERE
  const authenticated = true;
  if (!authenticated) {
    return (
      <div>
        <h1>Login/Signup Page</h1>
      </div>
    )
  }
  return (
    <div className="grid gap-4 grid-cols-[1fr_5fr_2.5fr] grid-rows-[1fr_5fr_1fr]">
      <FilterMenu></FilterMenu>
      <Header></Header>
      {/* below div keeps empty space for the filter menu  */}
      <div className="col-span-1"></div> 
    <section className="col-span-2">
      {
      (showEditor && !createNewNote) ? (
          <TipTapEditor
              syncNoteDiv={syncNoteDiv}
              noteContent={noteContent}
              setShowEditor={setShowEditor}
          ></TipTapEditor>) : ""
      }
      {
        (showEditor && createNewNote) ?
            <div>Will initialize editor with empty note</div> :
            <div>Something went wrong</div>
      }
      {
        // CLICKING ON NEW_NOTE_BUTTON WILL
        //1. OPEN EDITOR WITH EMPTY CONTENT
        //2. UPON CLOSURE OF EDITOR, THIS DATA WILL BE APPENDED INTO THE NOTE_DATA
        //3. NOTE_DATA LATEST NOTE WILL BE SYNCED
        newNoteButton ? (
            <NewNoteButton
                setCreateNewNote={setCreateNewNote}
            ></NewNoteButton>) : ""
      }
      <NoteContainer
          noteData={filteredNoteData}
          setSyncNoteDiv={setSyncNoteDiv} setShowEditor={toggleEditor}
      ></NoteContainer>
    </section>
    </div>
  );
}
