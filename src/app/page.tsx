// import Image from "next/image";
"use client";

import { TipTapEditor } from "./components/tiptap/tip-tap";


export default function Home() {
  return (
    <section className="logged-in-section">
      <div className="header"><h1>Placeholder Header</h1></div>
      <TipTapEditor></TipTapEditor>
    {/* <NoteContainer></NoteContainer> */}
{/* <Tiptap></Tiptap> */}
    <div className="footer"><h1>Placeholder Footer</h1></div>
    </section>
  );
}
