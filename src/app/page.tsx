"use client";
// PREDEFINED
import React, { useState, useEffect } from "react";
import { useNeonAuth } from '@/hooks/useNeonAuth';
// import { useUser } from '@auth0/nextjs-auth0/client';


// USER DEFINED
import { TipTapEditor } from "./components/tiptap/tip-tap";
import NoteContainer from "@/app/components/note_container/note_container";
import NewNoteButton from "./components/new_note_button/new_note_button";
import FilterMenu from "./components/filter_menu/filter_menu";
import Header from "./components/header/header";
import Login from "./components/login/login";
import {AddTodoForm} from "@/app/components/auth_check/auth_check";
import {Note} from "@/types/component_types";


let noteContent = "";

const nd = [{"id":1730559100,"dateCreated":1730559100,"dateModified":1730559115,"content":"Content for note with dateCreated = 1730559100"},{"id":1730644610,"dateCreated":1730644610,"dateModified":1730644625,"content":"Content for note with dateCreated = 1730644610"},{"id":1731993480,"dateCreated":1731993480,"dateModified":1731993495,"content":"Content for note with dateCreated = 1731993480"},{"id":1732635246,"dateCreated":1732635246,"dateModified":1732635261,"content":"Content for note with dateCreated = 1732635246"},{"id":1732876255,"dateCreated":1732876255,"dateModified":1732876270,"content":"Content for note with dateCreated = 1732876255"},{"id":1734017721,"dateCreated":1734017721,"dateModified":1734017736,"content":"Content for note with dateCreated = 1734017721"},{"id":1734525159,"dateCreated":1734525159,"dateModified":1734525174,"content":"Content for note with dateCreated = 1734525159"},{"id":1734891617,"dateCreated":1734891617,"dateModified":1734891632,"content":"Content for note with dateCreated = 1734891617"},{"id":1735041689,"dateCreated":1735041689,"dateModified":1735041704,"content":"Content for note with dateCreated = 1735041689"},{"id":1735641839,"dateCreated":1735641839,"dateModified":1735641854,"content":"Content for note with dateCreated = 1735641839"}];


export default function Home() {
  const getNoteData = () => nd;
  // const session = await auth0.getSession();
  const [noteData, setNoteData] = useState<Note[]>([]);
  const [sortedNoteData, setSortedNoteData] = useState<Note[]>([]);
  const [filteredNoteData, setFilteredNoteData] = useState<Note[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [syncNoteDiv, setSyncNoteDiv] = useState<HTMLDivElement>();
  const [newNoteButton, setNewNoteButton] = useState(!showEditor);
  const [createNewNote, setCreateNewNote] = useState(false);
  // const [loggedIn, setLoggedIn] = useState<boolean>(false);
  // console.debug("RENDERING HOME PAGE user STATE IS " + user);
  // useEffect(() => {
  //   console.debug("Will try to check for auth")
  //   const checkAuth = async () => {
  //     try {
  //       const res = await fetch("/api/auth/status");
  //       const data = await res.json();
  //       if (data.status !== 200) {
  //         console.log("NOT AUTHENTICATED! SEVEN HELLS!!");
  //         setUser(false);
  //       }
  //       else {
  //         console.log("User ID:", data.userId);
  //         setUser(true);
  //       }
  //     }catch(e) {
  //       console.log(e);
  //       console.error("SOME ERROR IN GETTING");
  //     }
  //   };
  //   checkAuth().then(r => {
  //     console.warn(r);
  //   });
  // }, []);
  // CLOSED WHEN A USER EITHER PRESSES [CLOSE] OR TYPES [CTRL+ALT+X] WHEN EDITOR IS OPEN


  const toggleEditor = (elem: React.MouseEvent<HTMLElement>) => {
    //if editor is already open, close it
    // also, extract heading, progress and textContent separately from target element
    // if (typeof(elem) === "")
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

  // RUN ONLY ONCE WHEN FETCHING DATA
  useEffect(() => {
    const fetchedData = getNoteData();
    setNoteData(prev => (JSON.stringify(prev) === JSON.stringify(fetchedData) ? prev : [...fetchedData]));
  }, []);

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

  // IMPLEMENT AUTH-0 LOGIN, SIGNUP HERE
  // const {user} = useUser();
  // console.warn("user details are");
  // console.log(user)
  const { isAuthenticated, isLoading, user } = useNeonAuth();
  if (!isAuthenticated) {
    return (
      // <Login></Login>
        <AddTodoForm></AddTodoForm>
    )
  }
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Header username={"user"}></Header>
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
