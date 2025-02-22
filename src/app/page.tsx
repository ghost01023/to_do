// import Image from "next/image";
"use client";

import { TipTapEditor } from "./components/tiptap/tip-tap";
import { useState, useEffect } from "react";
import NoteContainer from "./note_container/note_container";

const textContent = "<p>Yellow bellied mfs</p><p><strong>are you really here, now, </strong><em><strong>today</strong></em><strong>?</strong></p><p><strong>john, my friend, this right here, this is definitely </strong><em>kek</em>!</p>";


interface GenerateNoteProps {
  i: number
}



const generateNote = ({i}: GenerateNoteProps) => {
  // const date = Math.ceil(Math.random() * 100)
  console.log("i value is " + i);
  return {
    "id": i,
    "dateCreated": i,
    "dateModified": i + 15,
    "content": "Content for note with dateCreated = " + i,
  }
}


export default function Home() {
  const timeStamps = [ 1735641839, 1734017721, 1734891617, 1735041689, 1734525159, 1731993480, 1730644610, 1732635246, 1730559100, 1732876255 ].sort((a, b) => a - b);
  const [showEditor, setShowEditor] = useState(false);
  const [noteData, setNoteData] = useState<object[]>([]);

  useEffect(() => {
    setNoteData(timeStamps.map(i => generateNote({i})));
  }, []); 
  return (
    <section className="logged-in-section">
      <div className="header"><h1>Placeholder Header</h1></div>
      <button onClick={() => setShowEditor(!showEditor)}>Show Editor</button>
      {showEditor == true ? (<TipTapEditor content={textContent}></TipTapEditor>) : ""}
      <NoteContainer noteData={noteData}></NoteContainer>
    <div className="footer"><h1>Placeholder Footer</h1></div>
    </section>
  );
}
