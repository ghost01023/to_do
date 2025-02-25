"use client";
// PREDEFINED
import React, {useEffect, useState} from "react";
import prisma from "@/lib/prisma"

// USER DEFINED
import {TipTapEditor} from "./components/tiptap/tip-tap";
import NoteContainer from "@/app/note_container";
import NewNoteButton from "./components/new_note_button/new_note_button";
import FilterMenu from "./components/filter_menu/filter_menu";
import {Header} from "@/app/header";
import Login from "./components/login/login";
import {Note} from "@/types/component_types";


let noteContent = "";


export default function Home() {
  // const session = await auth0.getSession();
  const [noteData, setNoteData] = useState<Note[]>([]);
  const [sortedNoteData, setSortedNoteData] = useState<Note[]>([]);
  const [filteredNoteData, setFilteredNoteData] = useState<Note[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [syncNoteDiv, setSyncNoteDiv] = useState<HTMLDivElement>();
  const [newNoteButton, setNewNoteButton] = useState(!showEditor);
  const [createNewNote, setCreateNewNote] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const toggleEditor = (elem: React.MouseEvent<HTMLElement>) => {
    noteContent = elem?.currentTarget?.querySelector(".note-content")?.innerHTML || "";
    if (elem.currentTarget.tagName === "BUTTON" && elem.currentTarget.classList.contains("new-note-btn")) {
      alert("Initializing empty note")
      noteContent = "";
    }
    if (!showEditor) {
      // MAKE NOTE-CONTAINER GREY

    }
    setShowEditor(!showEditor);
  }

  // WHENEVER EDITOR IS SHOWN, NEW_NOTE_BUTTON IS HIDDEN AND THE OPPOSITE WHEN IT'S HIDDEN
  useEffect(() => {
  setNewNoteButton(!showEditor);
}, [showEditor]);

  useEffect(() => {
    fetch("/api/stack")
        .then(res => {
          if (!res) {
            console.log("NO USER WAS NOT FOUND");
            setLoggedIn(false);
          }
          return res.json()
        })
        .then(data => {
          // console.log("USER IS ");
          if (!data.user) {
            if (loggedIn) {
              setLoggedIn(false);
            }
          } else {
            console.log("WILL TRY TO FETCH ALL NOTES FOR USER");
            // console.log("TRYING TO FETCH ALL NOTES...");
            fetch("/api/all_notes").then(res => res.json()).then(data => {
              console.log(data);
              setNoteData([...data])
            });
            // fetch("/api/all_notes").then(res => res.json()).then(data => {
            //   console.error(data);
            // })
            // if (!loggedIn) {
            setLoggedIn(true);
            // }
          }
          // console.log(data);
        })
  }, [loggedIn]);


  // RUNS WHENEVER NOTE_DATA IS MODIFIED
  useEffect(() => {
    //SET SORT CONDITION HERE (data, percentage etc.)
    console.warn("noteData was set and am now sorting...");
    setSortedNoteData([...noteData].sort((a, b) => b.dateCreated - a.dateCreated));
  }, [noteData]);

  // RUNS WHENEVER SORTED_NOTE_DATA IS RE-SORTED VIA DIFFERENT PARAMETERS
  useEffect(() => {
    //SET FILTRATION PARAMETER(s) HERE
    console.warn("sortedNoteData was set and am now filtering...");
    setFilteredNoteData(sortedNoteData.filter((note) => note.dateCreated % 1 === 0));
  }, [sortedNoteData]);




  // const user = true;
  if (!loggedIn) {
    return (
      <Login></Login>
    )
  }
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Header></Header>
      <section className="flex flex-1 overflow-hidden">
        <FilterMenu></FilterMenu>
        {
      (showEditor && !createNewNote) ? (
          <TipTapEditor
              syncNoteDiv={syncNoteDiv} // FOR WHEN SYNCING||CLOSING
              noteContent={noteContent} // FOR LOADING
              noteData={noteData}
              setNoteData={setNoteData}
              setShowEditor={toggleEditor} // FOR CLOSING
              setNewNoteButton={setNewNoteButton}
          ></TipTapEditor>) : ""
      }
      {
        (showEditor && createNewNote) ?
            <TipTapEditor
              syncNoteDiv={undefined}
              noteData={noteData}
              setNoteData={setNoteData}
              noteContent={""}
              setShowEditor={toggleEditor}
              setNewNoteButton={setNewNoteButton}
            ></TipTapEditor> : ""
      }
      {
        // CLICKING ON NEW_NOTE_BUTTON WILL
        //1. OPEN EDITOR WITH EMPTY CONTENT
        //2. UPON CLOSURE OF EDITOR, THIS DATA WILL BE APPENDED INTO THE NOTE_DATA
        //3. NOTE_DATA LATEST NOTE WILL BE SYNCED
        newNoteButton ? (
            <NewNoteButton
                setCreateNewNote={setCreateNewNote}
                setShowEditor={toggleEditor}
            ></NewNoteButton>) : ""
      }
      <NoteContainer
          noteData={filteredNoteData}
          setSyncNoteDiv={setSyncNoteDiv}
          setShowEditor={toggleEditor}
      ></NoteContainer>
    </section>
    </div>
  );
}
