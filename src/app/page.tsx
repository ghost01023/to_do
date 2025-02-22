// import Image from "next/image";
"use client";

import { TipTapEditor } from "./components/tiptap/tip-tap";
import { useState, useEffect } from "react";
import NoteContainer from "./note_container/note_container";

let textContent = "<p>Yellow bellied mfs</p><p><strong>are you really here, now, </strong><em><strong>today</strong></em><strong>?</strong></p><p><strong>john, my friend, this right here, this is definitely </strong><em>kek</em>!</p>";

export interface SyncNote {
  divRef: React.MouseEvent<HTMLDivElement>; // Ref to access innerHTML
}

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

  const setShowEditorFunc = (elem: React.MouseEvent<HTMLDivElement>) => {
    //if editor is already open, close it
    textContent = elem.currentTarget.innerHTML;
    if (showEditor) {
      console.log("turning off editor");
      setShowEditor(false);
    } else {
      setShowEditor(true);
    }
  }

  useEffect(() => {
  console.log("Alive changed:", showEditor);
}, [showEditor]); // Runs whenever `alive` updates

  useEffect(() => {
    setNoteData([...getNoteData()])
  }, []);

  useEffect(() => {
    //SET SORT CONDITION HERE (data, percentage etc.)
    setSortedNoteData([...noteData].sort((a, b) => b.dateCreated - a.dateCreated));
  }, [noteData]);

  useEffect(() => {
    //SET FILTRATION PARAMETER(s) HERE
    setFilteredNoteData(sortedNoteData.filter((note) => note.dateCreated % 1 === 0));
  }, [sortedNoteData]);

  return (
    <section className="logged-in-section">
      <div className="header"><h1>Placeholder Header</h1></div>
      <button onClick={() => setShowEditor(!showEditor)}>Show Editor</button>
      {showEditor == true ? (<TipTapEditor syncNoteDiv={syncNoteDiv} content={textContent}setShowEditor={setShowEditor}></TipTapEditor>) : ""}
      <NoteContainer noteData={filteredNoteData} setSyncNoteDiv={setSyncNoteDiv} setShowEditor={setShowEditorFunc}></NoteContainer>
    <div className="footer"><h1>Placeholder Footer</h1></div>
    </section>
  );
}
